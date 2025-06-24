import { db } from '@/utils/db/db'
import { usersTable } from '@/utils/db/schema'
import { eq } from "drizzle-orm";
import { headers } from 'next/headers'
import Stripe from 'stripe';
import logger from '@/utils/logger'

// Add error handling for missing environment variables
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set");
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: Request) {
    const startTime = Date.now();
    const sig = headers().get('stripe-signature') as string;
    const body = await request.text()
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        logger.info('Stripe webhook received', { 
            eventType: event.type, 
            eventId: event.id,
            duration: Date.now() - startTime 
        });
    } catch (err: any) {
        logger.error('Stripe webhook signature verification failed', err, { 
            eventType: 'webhook_verification_failed',
            errorMessage: err.message 
        });
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;

                if (!session?.metadata?.user_id) {
                    logger.warn('No user_id in session metadata', { 
                        sessionId: session.id,
                        metadata: session.metadata 
                    });
                    return new Response('Webhook Error: Missing user_id in metadata', { status: 400 });
                }

                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                const user_id = session.metadata.user_id;
                const stripe_customer_id = subscription.customer as string;
                const plan = subscription.items.data[0]?.price.id;

                logger.info('Processing checkout session completion', {
                    sessionId: session.id,
                    userId: user_id,
                    plan: plan,
                    customerId: stripe_customer_id
                });

                // Find user in our DB
                const userInDb = await db.select().from(usersTable).where(eq(usersTable.id, user_id));
                
                if (userInDb.length > 0) {
                    // User exists, update their info
                    await db.update(usersTable)
                        .set({
                            plan: plan,
                            stripe_id: stripe_customer_id
                        })
                        .where(eq(usersTable.id, user_id));
                    
                    logger.info('Updated existing user subscription', { userId: user_id, plan });
                } else {
                    // This is a fallback, user should ideally exist.
                    // We need email to create a new user record.
                    const customer = await stripe.customers.retrieve(stripe_customer_id) as Stripe.Customer;
                    if (customer.email) {
                        await db.insert(usersTable).values({
                            id: user_id,
                            email: customer.email,
                            name: (customer.name || ''),
                            plan: plan,
                            stripe_id: stripe_customer_id,
                        });
                        
                        logger.info('Created new user from webhook', { 
                            userId: user_id, 
                            email: customer.email,
                            plan 
                        });
                    } else {
                        logger.error('Failed to create user - no email found', undefined, { 
                            userId: user_id, 
                            customerId: stripe_customer_id 
                        });
                    }
                }
                break;

            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                const sub = event.data.object as Stripe.Subscription;
                const stripeCustomerId = sub.customer as string;
                const newPlan = sub.items.data[0]?.price.id;
                const planStatus = sub.status;

                const newPlanStatus = (planStatus === 'active' || planStatus === 'trialing') ? newPlan : 'none';

                logger.info('Processing subscription update', {
                    subscriptionId: sub.id,
                    customerId: stripeCustomerId,
                    oldPlan: sub.metadata?.previous_plan,
                    newPlan: newPlanStatus,
                    status: planStatus
                });

                await db.update(usersTable)
                    .set({ plan: newPlanStatus })
                    .where(eq(usersTable.stripe_id, stripeCustomerId));
                break;

            default:
                logger.info('Unhandled Stripe event type', { eventType: event.type });
        }

        const duration = Date.now() - startTime;
        logger.info('Stripe webhook processed successfully', { 
            eventType: event.type, 
            duration 
        });

        return new Response('Success', { status: 200 })
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error('Error processing Stripe webhook', error instanceof Error ? error : new Error('Unknown error'), {
            eventType: event.type,
            eventId: event.id,
            duration
        });
        
        return new Response('Webhook processing failed', { status: 500 })
    }
}
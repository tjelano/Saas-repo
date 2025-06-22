import { db } from '@/utils/db/db'
import { usersTable } from '@/utils/db/schema'
import { eq } from "drizzle-orm";
import { headers } from 'next/headers'
import Stripe from 'stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    const sig = headers().get('stripe-signature') as string;
    const body = await request.text()
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.log("Stripe webhook signature verification failed.", err.message)
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;

            if (!session?.metadata?.user_id) {
                console.log("No user_id in session metadata")
                return new Response('Webhook Error: Missing user_id in metadata', { status: 400 });
            }

            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            const user_id = session.metadata.user_id;
            const stripe_customer_id = subscription.customer as string;
            const plan = subscription.items.data[0]?.price.id;

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

            await db.update(usersTable)
                .set({ plan: newPlanStatus })
                .where(eq(usersTable.stripe_id, stripeCustomerId));
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new Response('Success', { status: 200 })
}
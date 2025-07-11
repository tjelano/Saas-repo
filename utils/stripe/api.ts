import { Stripe } from 'stripe';
import { db } from '../db/db';
import { usersTable } from '../db/schema';
import { eq } from "drizzle-orm";

// Add error handling for missing environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PUBLIC_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ? process.env.NEXT_PUBLIC_WEBSITE_URL : "http://localhost:3000"

export async function getStripePlan(email: string) {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (!user || user.length === 0) {
        return "No Plan"
    }
    if (user[0].plan === 'none') {
        return "No Plan"
    }
    const subscription = await stripe.subscriptions.retrieve(
        user[0].plan
    );
    const productId = subscription.items.data[0].plan.product as string
    const product = await stripe.products.retrieve(productId)
    return product.name
}

export async function createStripeCustomer(id: string, email: string, name?: string) {
    const customer = await stripe.customers.create({
        name: name ? name : "",
        email: email,
        metadata: {
            supabase_id: id
        }
    });
    // Create a new customer in Stripe
    return customer.id
}

export async function createStripeCheckoutSession(email: string) {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    const customerSession = await stripe.customerSessions.create({
        customer: user[0].stripe_id,
        components: {
            pricing_table: {
                enabled: true,
            },
        },
    });
    return customerSession.client_secret
}

export async function generateStripeBillingPortalLink(email: string) {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (!user || user.length === 0 || !user[0].stripe_id) {
        // No Stripe ID found, return null so the UI can handle this gracefully
        return null;
    }
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user[0].stripe_id,
        return_url: `${PUBLIC_URL}/dashboard`,
    });
    return portalSession.url
}
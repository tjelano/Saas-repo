"use client"
import React, { useState, useEffect } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function StripePricingTable({ checkoutSessionSecret, clientReferenceId }: { checkoutSessionSecret: string, clientReferenceId: string }) {
    // Check for required environment variables
    const pricingTableId = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID || process.env.STRIPE_PRICING_TABLE_ID;
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;

    if (!pricingTableId || !publishableKey) {
        console.error("Missing Stripe environment variables:", {
            pricingTableId: !!pricingTableId,
            publishableKey: !!publishableKey
        });
        return (
            <div className="p-4 text-center text-red-500">
                Stripe configuration is missing. Please check your environment variables.
            </div>
        );
    }

    return (
        <stripe-pricing-table
            pricing-table-id={pricingTableId}
            publishable-key={publishableKey}
            customer-session-client-secret={checkoutSessionSecret}
            client-reference-id={clientReferenceId}
        >
        </stripe-pricing-table>
    )
};

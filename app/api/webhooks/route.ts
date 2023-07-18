import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/libs/stripe';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange
} from '@/libs/supabaseAdmin';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(
    request: Request
) {
    const body = await request.text();
    const sig = headers().get('Stripe-Signature');

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    }  catch (err: any) {
        console.log('Error Message: ' + err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
    }

}
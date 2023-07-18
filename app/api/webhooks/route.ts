import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe";
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange
} from "@/libs/supabaseAdmin"


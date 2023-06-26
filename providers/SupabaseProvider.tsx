"use client";

import { useState } from "react";

import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProviderProps: React.FC<SupabaseProviderProps> = ({
    children
}) => {
    const [supabaseCilent] = useState(() =>
        createClientComponentClient<Database>()
    )
}
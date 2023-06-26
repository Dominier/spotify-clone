"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProviderProps: React.FC<SupabaseProviderProps> = ({
    children
}) => {
    const [supabaseCilent] = useState(() =>
        createClientComponentClient<Database>()
    );

    return (
       <SessionContextProvider supabaseClient={supabaseCilent}>
            {children}
       </SessionContextProvider>
    )
}
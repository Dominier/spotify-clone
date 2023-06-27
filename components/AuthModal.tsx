"use client"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import useAuthModel from "@/hooks/useAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const {} = useAuthModel();

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen
            onChange={() => {}}
        >
            <Auth
                theme="dark"
                // can add google, and more for providers
                providers={["github"]}
                magicLink
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}

export default AuthModal;
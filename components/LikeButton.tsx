"use client";

/*
 This program will add liked songs assigned to userId when user clicks on the button
 This program can also unlike songs assigned to userId when users clicks again.
*/
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect (() => {
        if (!user?.id) {
            return;
        }
        {/* Fetch data from supabase */}
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();
            if (!error && data) {
                setIsLiked(true);
            }
        };
        fetchData();
    }, [songId, supabaseClient, user?.id]);

    // Checks if liked, if so use AiFilledHeart, if not use AiOutlineHeart
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {
        {/* This will check if user is signed in, if not return authModal */}
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
              .from('liked_songs')
              .delete()
              .eq('user_id', user.id)
              .eq('song_id', songId);

            if (error) {
                toast.error(error.message)
            } else {
                setIsLiked(false);    
            }
        } else {
            const { error } = await supabaseClient
            .from('liked_songs')
            .insert({
                song_id: songId,
                user_id: user.id
            });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
        }

        router.refresh();
    }


    return (
        <button
            onClick={handleLike}
            className="
                hover:opacity-75
                transition
            "
        >
            <Icon 
            color={isLiked ? '#22c55e' : 'white'}
            size={25}
            />
        </button>
    );
}

export default LikeButton;
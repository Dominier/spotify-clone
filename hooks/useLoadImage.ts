import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '@/types';


const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song) {
        return null;
    }
    const { data: imageData } = supabaseClient
        .storage
        .from('image')
        .getPublicUrl(song.image_path)
}
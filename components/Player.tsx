"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

const Player = () => {
    const player = usePlayer();
    // fetches song from supabase client side
    const { song } = useGetSongById(player.activeId);
    // load songs from supabase storage
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
                fixed
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
            "
        >
            Player
        </div>
    );
}

export default Player;
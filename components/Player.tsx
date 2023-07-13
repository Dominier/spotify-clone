"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

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
            <PlayerContent
                key={songUrl} // songUrl is key b/c we want skip/next functionality
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}

export default Player;
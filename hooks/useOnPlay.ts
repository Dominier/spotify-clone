import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

// When user (logged in) clicks on a song, it will play the song id
// Will also play playlist songs
const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };
    return onPlay;
};

export default useOnPlay;
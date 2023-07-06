"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }

        // TODO: default turn on player
    }

    return (
        <div>
            Media Item
        </div>
    );
}

export default MediaItem;
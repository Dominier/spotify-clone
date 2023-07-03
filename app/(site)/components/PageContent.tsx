"use client";

import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-netural-400">
                No songs avaiable.
            </div>
        )
    }
    return (
        <div>
            Page Content
        </div>
    );
}

export default PageContent;
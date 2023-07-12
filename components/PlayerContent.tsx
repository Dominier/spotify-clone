/*
    This is the player content. It will display the song, like button, play, next, etc.
    This will only appear when an user clicks on the play button
*/
"use client"

import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const Icon = true ? BsPauseFill : BsPlayFill;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="
                flex
                w-full
                justify-start
            ">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div // only on mobile
                className="
                    flex
                    md:hidden
                    col-auto
                    w-full
                    justify-end
                    items-center
            ">
                <div
                    onClick={() => {}}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div // desktop view
                className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
                "
            >
                <AiFillStepBackward // backward button
                    onClick={() => {}}
                    size={30} 
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                <div // play button
                    onClick={() => {}}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward // forward button
                    onClick={() => {}}
                    size={30} 
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>
        </div>
    );
}

export default PlayerContent;
/*
    This is the player content. It will display the song, like button, play, next, etc.
    This will only appear when an user clicks on the play button
*/
"use client"

import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill; // FIXME: Make dyanamic
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave; // FIXME: Make dynamic

    const onPlayNext = () => {
        // check if there are songs
        if (player.ids.length === 0) {
            return;
        }

        // find current index of song playing
        const currentIndex = player.ids.findIndex((id) =>  id === player.activeId);
        // find next index of song playing
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) { // if there's no next song, reset index to 0
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        // check if there are songs
        if (player.ids.length === 0) {
            return;
        }

        // find current index of song playing
        const currentIndex = player.ids.findIndex((id) =>  id === player.activeId);
        // find next index of previous song
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) { // if song playing is first index, play last song of playlist when clicked
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true), // when playing, setIsPlaying is true
            onend: () => {
                setIsPlaying(false); // when setIsPlaying is false, play the next song
                onPlayNext(); 
            },
            onpause: () => setIsPlaying(false), // when paused, setIsPlaying to false
            format: ['mp3']
        } 
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) { // if it is not playing, play
            play();
        } else {          // otherwise, pause the song
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }


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
                    onClick={handlePlay} // play button for mobile
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

            <div // desktop view controls
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
                    onClick={onPlayPrevious}
                    size={30} 
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                <div // play button
                    onClick={handlePlay}
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
                    onClick={onPlayNext}
                    size={30} 
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon // Volume
                        onClick={toggleMute} 
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider 
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;
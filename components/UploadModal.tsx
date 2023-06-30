"use client"

import uniqid from "uniqid";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";



const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    // Everytime user closes form, it will reset the form
    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose()
        }
    }


    // access to author, title, song, and image upon submit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueID = uniqid();

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    flex-col
                    gap-y-4
                "
            >
                <Input 
                    id="title"
                    disabled={isLoading}   
                    {...register('title', { required: true })} // spread props and attributes that we will need for input
                    placeholder="Song title"
                />
                <Input 
                    id="author"
                    disabled={isLoading}   
                    {...register('author', { required: true })} // spread props and attributes that we will need for input
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input 
                        id="song"
                        type="file"
                        disabled={isLoading}   
                        accept=".mp3"
                        {...register('song', { required: true })} // spread props and attributes that we will need for input
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input 
                        id="image"
                        type="file"
                        disabled={isLoading}   
                        accept="image/*"
                        {...register('image', { required: true })} // spread props and attributes that we will need for input
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}

export default UploadModal;
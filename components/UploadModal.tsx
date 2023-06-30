"use client"

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";
import Input from "./Input";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState();
    const uploadModal = useUploadModal();

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
        // Upload to supabase
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
            >
                <Input 
                    id="title"
                    disabled={isLoading}   
                    {...register('title', { required: true })} // spread props and attributes that we will need for input
                    placeholder="Song title"
                />
            </form>
        </Modal>
    );
}

export default UploadModal;
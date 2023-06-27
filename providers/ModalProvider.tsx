/* 
    ModalProvider is the dialog that appears on top of the main content and moves
    the system into a special mode requiring user interaction
*/

"use client"

import { useState, useEffect } from "react";

import Modal from "@/components/Modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // this will prevent hydration error
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    
    return (
        <>
            <Modal
                title="Test Modal" 
                description="Test Description" 
                isOpen 
                onChange={() => {}}
             >
                Test Children
             </Modal>
        </>
    )
}

export default ModalProvider;
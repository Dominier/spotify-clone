/* 
    ModalProvider is the dialog that appears on top of the main content and moves
    the system into a special mode requiring user interaction
*/

"use client"

import { useState, useEffect } from "react";

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
            Modals
        </>
    )
}

export default ModalProvider;
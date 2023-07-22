// Error message that pops up whenever there's conflict.
"use client"

import Box from "@/components/Box";

const Error = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">
                Something went wrong.
            </div>
        </Box>
    )
};

export default Error;

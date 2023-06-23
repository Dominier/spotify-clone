"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiHome } from "react-icons/bi";

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiHome,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]);

    return (
        <div>
            {children}
        </div>
    );
}

export default Sidebar;
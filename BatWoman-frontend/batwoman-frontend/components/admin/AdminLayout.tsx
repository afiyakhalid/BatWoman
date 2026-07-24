"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({

    children,

}: AdminLayoutProps) {

    const [

        collapsed,

        setCollapsed,

    ] = useState(false);

    function toggleSidebar() {

        setCollapsed((previous) => !previous);

    }

    return (

        <div className="min-h-screen bg-neutral-100">

            {/* Sidebar */}

            <Sidebar

                collapsed={collapsed}

                onToggle={toggleSidebar}

            />

            {/* Main Content */}

            <div

                className={`

                    transition-all

                    duration-300

                    ${collapsed ? "ml-24" : "ml-72"}

                `}

            >

                {/* Top Navigation */}

                <TopNavbar />

                {/* Page Content */}

                <main className="p-10">

                    {children}

                </main>

            </div>

        </div>

    );

}
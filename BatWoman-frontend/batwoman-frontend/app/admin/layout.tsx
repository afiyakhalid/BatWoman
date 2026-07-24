"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Layout({

    children,

}: {

    children: React.ReactNode;

}) {

    const router = useRouter();

    const {

        data: user,

        isLoading,

    } = useCurrentUser();

    useEffect(() => {

        if (!isLoading && user?.role !== "ADMIN") {

            router.replace("/");

        }

    }, [user, isLoading]);

    if (isLoading) {

        return null;

    }

    if (user?.role !== "ADMIN") {

        return null;

    }

    return (

        <AdminLayout>

            {children}

        </AdminLayout>

    );

}
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Design Muse - Dashboard",
    description: "Your AI-powered design partner.",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

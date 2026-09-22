import { useState, type ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

type AdminLayoutProps = {
    children: ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#101631]">

            {/* Mobile menu button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 md:hidden text-white text-3xl"
            >
                ☰
            </button>

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-40
                    h-screen
                    transition-transform duration-300
                    ${isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                    md:translate-x-0
                `}
            >
                <AdminSidebar
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Page content */}
            <main className="min-h-screen md:ml-64">
                {children}
            </main>

        </div>
    );
}

export default AdminLayout;

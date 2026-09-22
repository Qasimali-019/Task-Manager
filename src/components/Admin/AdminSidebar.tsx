
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

type AdminSidebarProps = {
    closeSidebar: () => void;
};

function AdminSidebar({ closeSidebar }: AdminSidebarProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        closeSidebar();
    };

    return (
        <aside className="w-64 h-screen bg-[#161d39] p-6 text-white flex flex-col">


            <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">
                    Admin Panel
                </h2>


            </div>

            <nav className="flex flex-col gap-3">

                <Link
                    to="/admin"
                    onClick={closeSidebar}
                    className="px-4 py-3 rounded-md hover:bg-[#23284a] transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/users"
                    onClick={closeSidebar}
                    className="px-4 py-3 rounded-md hover:bg-[#23284a] transition"
                >
                    Users
                </Link>

                <Link
                    to="/admin/tasks"
                    onClick={closeSidebar}
                    className="px-4 py-3 rounded-md hover:bg-[#23284a] transition"
                >
                    Tasks
                </Link>

            </nav>

            <button
                onClick={handleLogout}
                className="mt-auto w-full px-4 py-3 rounded-md bg-red-600 hover:bg-red-700 transition"
            >
                Logout
            </button>

        </aside>
    );
}

export default AdminSidebar;


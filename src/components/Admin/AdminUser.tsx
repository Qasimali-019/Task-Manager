import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminTable from "./AdminTable";

type AdminUser = {
    id: number;
    name: string;
    email: string;
    role: string;
};

function AdminUsers() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = useSelector(
        (state: { auth: { token: string | null } }) => state.auth.token
    );

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setError("Please log in as admin.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch users");
                }
                setUsers(data.users);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        void fetchUsers();
    }, [token]);

    const filteredUsers = users.filter((user) => {
        const query = search.trim().toLowerCase();
        return !query ||
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);
    });

    return (
        <div className="min-h-screen bg-[#101631] px-4 py-6 sm:px-6 sm:py-8">
            <h1 className="mb-8 text-4xl font-bold text-white">
                Users
            </h1>

            {error && <p role="alert" className="mb-4 text-red-400">{error}</p>}

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-600 bg-[#161d39] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-[#00AFFF] sm:max-w-md"
                />
            </div>

            <AdminTable headers={["Name", "Email", "Role"]}>
                {loading ? (
                    <tr>
                        <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                            Loading users...
                        </td>
                    </tr>
                ) : filteredUsers.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                            No users found matching "{search}"
                        </td>
                    </tr>
                ) : (
                    filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t border-gray-700">
                            <td className="px-5 py-4 font-medium text-white">
                                {user.name}
                            </td>
                            <td className="px-5 py-4 text-gray-300">
                                {user.email}
                            </td>
                            <td className="px-5 py-4 capitalize text-gray-300">
                                {user.role}
                            </td>
                        </tr>
                    ))
                )}
            </AdminTable>
        </div>
    );
}

export default AdminUsers;

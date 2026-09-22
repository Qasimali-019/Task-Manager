import { useState } from "react";
import { useSelector } from "react-redux";
import type { AuthState } from "../../types/task";
import AdminTable from "./AdminTable";

function AdminUsers() {
    const [search, setSearch] = useState("");

    const users = useSelector((state: { auth: AuthState }) => state.auth.users);

    const filteredUsers = users
        .filter((user) => user.role === "user")
        .filter((user) => {
            if (search.trim() === "") return true;

            const searchLower = search.toLowerCase();
            const matchesName = user.name.toLowerCase().includes(searchLower);
            const matchesEmail = user.email.toLowerCase().includes(searchLower);

            return matchesName || matchesEmail;
        });

    return (
        <div className="min-h-screen bg-[#101631] px-4 py-6 sm:px-6 sm:py-8">
            <h1 className="mb-8 text-4xl font-bold text-white">
                Users
            </h1>

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
                {filteredUsers.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                            No users found matching "{search}"
                        </td>
                    </tr>
                ) : (
                    filteredUsers.map((user) => (
                        <tr key={user.email} className="border-t border-gray-700">
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
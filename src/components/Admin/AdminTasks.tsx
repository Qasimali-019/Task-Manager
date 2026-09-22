
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import type { AuthState } from "../../types/task";
import { Newcontext } from "../../Context/TaskContext";
import AdminTable from "./AdminTable";

function AdminTasks() {
    const [search, setSearch] = useState("")
    const [userFilter, setUserFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const users = useSelector(
        (state: { auth: AuthState }) => state.auth.users
    );


    const context = useContext(Newcontext);

    if (!context) {
        return null;
    }

    const { task } = context;

    const filterTasks = task.filter((item) => {
        const match = item.name.toLowerCase().includes(search.toLowerCase())

        const matchesUser = userFilter === "all" || item.userEmail === userFilter
        const matchesStatus = statusFilter === "all" || (statusFilter === "completed" && item.isCompleted) ||
            (statusFilter === "pending" && !item.isCompleted)
        return match && matchesUser && matchesStatus
    });
    const clearFilters = () => {
        setSearch("")
        setUserFilter("all")
        setStatusFilter("all")
    }




    return (
        <div className="min-h-screen bg-[#101631] px-4 py-6 sm:px-6 sm:py-8">

            <h1 className="mb-8 text-4xl font-bold text-white">
                Tasks
            </h1>


            <div className="mb-8 flex flex-col gap-4 lg:flex-row">


                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-600 bg-[#161d39] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-[#00AFFF] lg:flex-1"
                />


                <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="rounded-md border border-gray-600 bg-[#161d39] px-4 py-3 text-white outline-none focus:border-[#00AFFF]"
                >
                    <option value="all">All Users</option>
                    {users
                        .filter((user) => user.role !== "admin")
                        .map((user) => (
                            <option key={user.email} value={user.email}>
                                {user.name}
                            </option>
                        ))}
                </select>


                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-md border border-gray-600 bg-[#161d39] px-4 py-3 text-white outline-none focus:border-[#00AFFF]"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>


                <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-md bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-600"
                >
                    Clear
                </button>

            </div>


            <AdminTable headers={["Task", "User", "Priority", "Due Date", "Status"]}>
                {filterTasks.map((item) => {
                    const taskUser = users.find((user) => user.email === item.userEmail);

                    return (
                        <tr key={item.id} className="border-t border-gray-700">
                            <td className="px-5 py-4">{item.name}</td>
                            <td className="px-5 py-4">{taskUser?.name || item.userEmail}</td>
                            <td className="px-5 py-4 capitalize">{item.priority}</td>
                            <td className="px-5 py-4">{item.dueDate || "No date"}</td>
                            <td className="px-5 py-4">
                                {item.isCompleted ? "Completed" : "Pending"}
                            </td>
                        </tr>
                    )
                })}
            </AdminTable>

        </div>
    );
}

export default AdminTasks
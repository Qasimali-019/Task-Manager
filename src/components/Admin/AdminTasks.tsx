import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminTable from "./AdminTable";

type AdminTask = {
    id: number;
    title: string;
    priority: "low" | "medium" | "high";
    due_date: string | null;
    status: "pending" | "completed";
    user_name: string;
    user_email: string;
};

function AdminTasks() {
    const [search, setSearch] = useState("");
    const [userFilter, setUserFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [tasks, setTasks] = useState<AdminTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = useSelector(
        (state: { auth: { token: string | null } }) => state.auth.token
    );

    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) {
                setError("Please log in as admin.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/admin/tasks", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch tasks");
                }
                setTasks(data.tasks);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch tasks");
            } finally {
                setLoading(false);
            }
        };

        void fetchTasks();
    }, [token]);

    const clearFilters = () => {
        setSearch("");
        setUserFilter("all");
        setStatusFilter("all");
    };

    const filterTasks = tasks.filter((item) => {
        const matchesTitle = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesUser = userFilter === "all" || item.user_email === userFilter;
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesTitle && matchesUser && matchesStatus;
    });
    const taskUsers = Array.from(
        new Map(tasks.map((task) => [task.user_email, task.user_name])).entries()
    );

    return (
        <div className="min-h-screen bg-[#101631] px-4 py-6 sm:px-6 sm:py-8">
            <h1 className="mb-8 text-4xl font-bold text-white">
                Tasks
            </h1>
            {error && <p role="alert" className="mb-4 text-red-400">{error}</p>}

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
                    {taskUsers.map(([email, name]) => (
                        <option key={email} value={email}>
                            {name}
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
                {loading ? (
                    <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                            Loading tasks...
                        </td>
                    </tr>
                ) : filterTasks.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                            No tasks found.
                        </td>
                    </tr>
                ) : filterTasks.map((item) => (
                    <tr key={item.id} className="border-t border-gray-700">
                        <td className="px-5 py-4">{item.title}</td>
                        <td className="px-5 py-4">{item.user_name || item.user_email}</td>
                        <td className="px-5 py-4 capitalize">{item.priority}</td>
                        <td className="px-5 py-4">
                            {item.due_date ? new Date(item.due_date).toLocaleDateString() : "No date"}
                        </td>
                        <td className="px-5 py-4 capitalize">{item.status}</td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    );
}

export default AdminTasks;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminCards from "./AdminCards";
import AdminTable from "./AdminTable";

type AdminStats = {
    totalUsers: number;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    highPriorityTasks: number;
    overdueTasks: number;
};

type RecentTask = {
    id: number;
    title: string;
    user_name: string;
    user_email: string;
    priority: "low" | "medium" | "high";
    due_date: string | null;
    status: "pending" | "completed";
};


function AdminDashboard() {

    const [stats, setStats] = useState<AdminStats | null>(null);
    const [activity, setActivity] = useState<RecentTask[]>([]);
    const [activityLoading, setActivityLoading] = useState(true);
    const [activityError, setActivityError] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = useSelector(
        (state: { auth: { token: string | null } }) => state.auth.token
    );

    useEffect(() => {
        const fetchAdminStats = async () => {
            if (!token) {
                setError("Please log in as admin.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/admin/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                console.log("Admin API status:", response.status);
                console.log("Admin API response:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch statistics");
                }

                setStats(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        void fetchAdminStats();
    }, [token]);

    useEffect(() => {
        const fetchActivity = async () => {
            if (!token) {
                setActivityLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/admin/activity", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch recent activity");
                }
                setActivity(data.activity);
            } catch (err) {
                setActivityError(
                    err instanceof Error ? err.message : "Failed to fetch recent activity"
                );
            } finally {
                setActivityLoading(false);
            }
        };

        void fetchActivity();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#101631] px-6 py-8">
            <div className="w-full">
                {loading && (
                    <p className="mb-4 text-amber-400">
                        Loading dashboard statistics...
                    </p>
                )}

                {error && (
                    <p className="mb-4 text-red-400">
                        {error}
                    </p>
                )}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage users and monitor tasks
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AdminCards title="Total Users" value={stats?.totalUsers ?? 0} />
                    <AdminCards title="Total Tasks" value={stats?.totalTasks ?? 0} />
                    <AdminCards title="Completed Tasks" value={stats?.completedTasks ?? 0} />
                    <AdminCards title="Pending Tasks" value={stats?.pendingTasks ?? 0} />
                    <AdminCards title="High Priority" value={stats?.highPriorityTasks ?? 0} />
                    <AdminCards title="Overdue Tasks" value={stats?.overdueTasks ?? 0} />
                </div>

                <div className="mt-10">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        Recent Activity
                    </h2>

                    <AdminTable
                        headers={[
                            "Task",
                            "User",
                            "Priority",
                            "Due Date",
                            "Status"
                        ]}
                    >
                        {activityError ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-8 text-center text-red-400">
                                    {activityError}
                                </td>
                            </tr>
                        ) : activityLoading ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                                    Loading recent activity...
                                </td>
                            </tr>
                        ) : activity.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                                    No recent activity
                                </td>
                            </tr>
                        ) : activity.map((item) => (
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

            </div>
        </div>
    );
}

export default AdminDashboard;
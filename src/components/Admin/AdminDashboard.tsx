import { useSelector } from "react-redux";
import type { AuthState } from "../../types/task";
import { useContext } from "react";
import { Newcontext } from "../../Context/TaskContext";
import AdminCards from "./AdminCards";
import AdminTable from "./AdminTable";

function AdminDashboard() {



    const user = useSelector((state: { auth: AuthState }) => state.auth.users)
    const context = useContext(Newcontext)

    if (!context) {
        return null
    }
    const { task } = context

    const totalUsers = user.filter((user) => user.role === "user").length
    const totalTasks = task.length
    const completedTasks = task.filter((item) => item.isCompleted).length
    const pendingTasks = task.filter((item) => !item.isCompleted).length
    const highhPriorityTasks = task.filter((item) => item.priority === "high").length
    const overdueTasks = task.filter((item) => {
        if (!item.dueDate || item.isCompleted) {
            return false;
        }
        return new Date(item.dueDate) < new Date()
    }).length


    const recentTasks = [...task].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);


    return (

        <div className="min-h-screen bg-[#101631] px-6 py-8">
            <div className="w-full">


                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Manage users and monitor tasks
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AdminCards title="Total Users" value={totalUsers} />
                    <AdminCards title="Total Tasks" value={totalTasks} />
                    <AdminCards title="Completed Tasks" value={completedTasks} />
                    <AdminCards title="Pending Tasks" value={pendingTasks} />
                    <AdminCards title="High Priority" value={highhPriorityTasks} />
                    <AdminCards title="Overdue Tasks" value={overdueTasks} />
                </div>





                <div className="mt-10">
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold text-white">
                            Recent Activity
                        </h2>

                        <AdminTable headers={["Task", "User", "Priority", "Due Date", "Status"]}>
                            {recentTasks.length > 0 ? (
                                recentTasks.map((item) => {
                                    const taskUser = user.find((u) => u.email === item.userEmail);

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
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                                        No recent activity
                                    </td>
                                </tr>
                            )}
                        </AdminTable>
                    </div>


                </div>



            </div>
        </div>
    );
}

export default AdminDashboard
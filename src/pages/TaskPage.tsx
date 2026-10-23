import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../components/redux/authSlice";
import DashboardCards from "../components/DashboardCards";
import Form from "../components/Form";
import List from "../components/List";
import { useEffect, useState } from "react";
import type { BackendTask } from "../types/task";

function TaskPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoggedIn, token } = useSelector(
        (state: {
            auth: {
                user: { name?: string } | null;
                isLoggedIn: boolean;
                token: string | null;
            };
        }) => state.auth
    );

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [tasks, setTasks] = useState<BackendTask[]>([]);

    const handleTaskCreated = (newTask: BackendTask) => {
        setTasks((previousTasks) => [
            newTask,
            ...previousTasks
        ]);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        if (!token || !isLoggedIn) return;

        const loadTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    console.error("Failed to fetch tasks:", data.message);
                    return;
                }
                setTasks(data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        void loadTasks();
    }, [token, isLoggedIn]);


    const handleDeleteTask = async (taskId: number) => {
        if (!token) return;

        try {
            const respone = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!respone.ok) {
                throw new Error("Failed to delete task");
            }
            // Remove the deleted task from the local state
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };


    const handleUpdateTask = async (
        taskId: number,
        title: string,
        description: string | null,
        priority: "low" | "medium" | "high",
        due_date: string | null,
        status: "pending" | "completed"
    ) => {
        if (!token) return false;

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title, description, priority, due_date, status }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.id === taskId ? data.task : task
                )
            );

            return true;

        } catch (error) {
            console.error("Error updating task:", error);
            return false;
        }
    };


    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#181d39] px-4 py-6 sm:px-6 md:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-6xl">

                {/* Top Navigation */}
                <header className="flex items-center justify-between border-b border-white/10 pb-5">
                    <h1 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
                        TASK MANAGER
                    </h1>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                        Logout
                    </button>
                </header>


                <section className="mt-8">
                    <p className="text-sm font-medium text-white/50">
                        Dashboard
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                        Welcome back, {user?.name}
                    </h2>

                    <p className="mt-2 text-sm text-white/60 sm:text-base">
                        Here's what's happening with your tasks.
                    </p>
                </section>


                <section className="mt-8">
                    <DashboardCards tasks={tasks} />
                </section>

                {/* Tasks Section */}
                <section className="mt-10">

                    {/* Section Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Your Tasks
                            </h2>

                            <p className="mt-1 text-sm text-white/50">
                                Manage your tasks and stay organized.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsAddTaskOpen(true)}
                            className="flex w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-[#181d39] transition hover:bg-amber-300 active:scale-[0.98] sm:w-auto"
                        >
                            + Add Task
                        </button>
                    </div>

                    <Form
                        isOpen={isAddTaskOpen}
                        onClose={() => setIsAddTaskOpen(false)}
                        onTaskCreated={handleTaskCreated}
                    />

                    <div className="mt-5">
                        <List tasks={tasks}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                    </div>

                </section>
            </div>
        </div>
    );
}

export default TaskPage;


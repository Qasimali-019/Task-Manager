import { useSelector } from "react-redux";
import { Newcontext } from "../Context/TaskContext";
import { useContext } from "react";
import type { AuthState } from "../types/task";


function DashboardCards() {
    const context = useContext(Newcontext)
    const user = useSelector((state: { auth: AuthState }) => state.auth.user)
    const today = new Date().toISOString().split("T")[0] // for date

    if (!context || !user) {
        return null;
    }
    const { task } = context

    const userTasks = task.filter((task) => task.userEmail === user.email)
    const totalTasks = userTasks.length
    const activeTasks = userTasks.filter((task) => !task.isCompleted).length
    const completedTasks = userTasks.filter((task) => task.isCompleted).length
    const highPriorityTasks = userTasks.filter((task) => task.priority === "high" && !task.isCompleted).length
    const dueTodayTasks = userTasks.filter((task) => task.dueDate === today && !task.isCompleted).length
    const overdueTasks = userTasks.filter((task) => task.dueDate < today && !task.isCompleted).length


    const cards = [
        {
            title: "Total Tasks",
            value: totalTasks,
            icon: ""
        },

        {
            title: "Active Tasks",
            value: activeTasks,
            icon: ""
        },
        {
            title: "Completed",
            value: completedTasks,
            icon: ""
        },

        {
            title: "High Priority ",
            value: highPriorityTasks,
            icon: ""
        },

        {
            title: "Due Today ",
            value: dueTodayTasks,
            icon: ""
        },

        {
            title: "Over Due ",
            value: overdueTasks,
            icon: ""
        },

    ]



    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="rounded-2xl bg-[#23284a] p-5 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            {card.icon}
                            <span>{card.title}</span>
                        </p>
                        <p className="text-3xl font-bold text-white">
                            {card.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;

import type { BackendTask } from "../types/task";

type DashboardCardsProps = {
    tasks: BackendTask[];
};

function DashboardCards({ tasks }: DashboardCardsProps) {

    // Get today's date in local time
    const now = new Date();

    const today =
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")}`;

    // Calculate statistics
    const totalTasks = tasks.length;

    const activeTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) =>
            task.priority === "high" &&
            task.status === "pending"
    ).length;

    const dueTodayTasks = tasks.filter(
        (task) =>
            task.due_date?.slice(0, 10) === today &&
            task.status === "pending"
    ).length;

    const overdueTasks = tasks.filter(
        (task) =>
            task.due_date !== null &&
            task.due_date.slice(0, 10) < today &&
            task.status === "pending"
    ).length;

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
            title: "High Priority",
            value: highPriorityTasks,
            icon: ""
        },
        {
            title: "Due Today",
            value: dueTodayTasks,
            icon: ""
        },
        {
            title: "Over Due",
            value: overdueTasks,
            icon: ""
        }
    ];

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
}

export default DashboardCards;


import { useState } from "react";
import Items from "./Item";
import type { BackendTask } from "../types/task";

type ListProps = {
  tasks: BackendTask[];
  onDeleteTask: (taskId: number) => Promise<void>;
  onUpdateTask: (
    taskId: number,
    title: string,
    description: string | null,
    priority: "low" | "medium" | "high",
    due_date: string | null,
    status: "pending" | "completed"
  ) => Promise<boolean>;
};

function List({ tasks, onDeleteTask, onUpdateTask }: ListProps) {

  const [search, setSearch] = useState("");
  const [statusfilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusfilter === "all" ||
      task.status === statusfilter;

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <section className="w-full max-w-4xl">

      <div className="mb-4 flex items-center justify-between px-1">
        <div>


          <p className="mt-1 text-sm text-white/50">
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#23284a] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-amber-400/50"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">


        <select
          value={statusfilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg bg-[#23284a] px-4 py-2 text-sm text-white/70 outline-none">

          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>

        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg bg-[#23284a] px-4 py-2 text-sm text-white/70 outline-none">
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setSearch("")
            setStatusFilter("all")
            setPriorityFilter("all")
          }}
          className="rounded-lg bg-[#23284a] px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          Clear
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#23284a] shadow-xl">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={
                index !== filteredTasks.length - 1
                  ? "border-b border-white/10"
                  : ""
              }
            >
              <Items task={task}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask} />
            </div>
          ))
        ) : (
          <div className="flex min-h-32 flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-medium text-white/60">
              No tasks found.
            </p>

            <p className="mt-1 text-xs text-white/40">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
export default List;

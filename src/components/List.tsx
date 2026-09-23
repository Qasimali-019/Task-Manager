
import { useContext, useState } from "react";
import { Newcontext } from "../Context/TaskContext";
import Items from "./Item";
import type { AuthState } from "../types/task";
import { useSelector } from "react-redux";

function List() {
  const context = useContext(Newcontext);
  const [search, setSearch] = useState("");
  const [statusfilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all")
  const user = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );

  if (!context || !user) {
    return null;
  }

  const { task } = context;

  const usertasks = task.filter(
    (task) => task.userEmail === user.email
  );


  const filteredTasks = usertasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      statusfilter === "all" ||
      (statusfilter === "pending" && !task.isCompleted) ||
      (statusfilter === "completed" && task.isCompleted)

    const matchesPriority =
      priorityFilter === "all" ||
      (task.priority === priorityFilter)


    return matchesSearch && matchesFilter && matchesPriority;
  });


  return (
    <section className="w-full max-w-4xl">

      <div className="mb-4 flex items-center justify-between px-1">
        <div>


          <p className="mt-1 text-sm text-white/50">
            {usertasks.length}{" "}
            {usertasks.length === 1 ? "task" : "tasks"}
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
          <option value="pendingl">Pending</option>
          <option value="completed">Completed</option>

        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg bg-[#23284a] px-4 py-2 text-sm text-white/70 outline-none">
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="">Low</option>
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
              <Items task={task} />
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


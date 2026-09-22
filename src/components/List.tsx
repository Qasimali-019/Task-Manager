
import { useContext, useState } from "react";
import { Newcontext } from "../Context/TaskContext";
import Items from "./Item";
import type { AuthState } from "../types/task";
import { useSelector } from "react-redux";

function List() {
  const context = useContext(Newcontext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
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
      filter === "all" ||
      (filter === "pending" && !task.isCompleted) ||
      (filter === "completed" && task.isCompleted) ||
      task.priority === filter;

    return matchesSearch && matchesFilter;
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
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "all"
            ? "bg-amber-400 text-[#181d39]"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "pending"
            ? "bg-amber-400 text-[#181d39]"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "completed"
            ? "bg-amber-400 text-[#181d39]"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("high")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "high"
            ? "bg-amber-400 text-white"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          High
        </button>

        <button
          onClick={() => setFilter("medium")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "medium"
            ? "bg-amber-400 text-[#181d39]"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          Medium
        </button>

        <button
          onClick={() => setFilter("low")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "low"
            ? "bg-amber-400 text-[#181d39]"
            : "bg-[#23284a] text-white/60"
            }`}
        >
          Low
        </button>


        <button
          type="button"
          onClick={() => {
            setSearch("");
            setFilter("all");
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


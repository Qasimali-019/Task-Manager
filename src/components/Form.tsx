import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Newcontext } from "../Context/TaskContext";
import type { AuthState } from "../types/task";

type FormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Form = ({ isOpen, onClose }: FormProps) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("")

  const user = useSelector((state: { auth: AuthState }) => state.auth.user);
  const todoContext = useContext(Newcontext);

  if (!todoContext || !isOpen) return null;

  const { addTask } = todoContext;

  const handleAdd = () => {
    if (name.trim() === "" || !user) return;

    addTask(name, user.email, priority, dueDate);
    setName("")
    setPriority("medium")
    setDueDate("")
    onClose();
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">


      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#23284a] p-6 shadow-2xl">

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-white/50 transition hover:bg- red- hover:text-white"
        >
          ×
        </button>




        <div className="pr-8">
          <h2 className="text-2xl font-bold text-white">Add New Task</h2>
          <p className="mt-1 text-sm text-white/50">
            Create a new task to keep yourself organized.
          </p>
        </div>


        <div className="mt-6">
          <label
            htmlFor="task-name"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Task Name
          </label>
          <input
            id="task-name"
            type="text"
            autoFocus
            placeholder="Enter your task..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-white/10 bg-[#181d39] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-white/80">
            Priority
          </label>

          <div className="grid grid-cols-3 gap-2">
            {/* Low */}
            <button
              type="button"
              onClick={() => setPriority("low")}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${priority === "low"
                ? "border-green-400/50 bg-green-400/10 text-green-400"
                : "border-white/10 bg-[#181d39] text-white/50 hover:bg-white/5"
                }`}
            >
              Low
            </button>

            <button
              type="button"
              onClick={() => setPriority("medium")}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${priority === "medium"
                ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                : "border-white/10 bg-[#181d39] text-white/50 hover:bg-white/5"
                }`}
            >
              Medium
            </button>


            <button
              type="button"
              onClick={() => setPriority("high")}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${priority === "high"
                ? "border-red-400/50 bg-red-400/10 text-red-400"
                : "border-white/10 bg-[#181d39] text-white/50 hover:bg-white/5"
                }`}
            >
              High
            </button>
          </div>
        </div>


        <div className="mt-5">
          <label
            htmlFor="due-date"
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Due Date
          </label>

          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#181d39] px-4 py-3 text-sm text-white outline-none focus:border-amber-400/60"
          />
        </div>


        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-[#181d39] transition hover:bg-amber-300 active:scale-[0.98]"
          >
            Add Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default Form;

import { useContext, useState } from "react";
import { type TaskItem } from "../types/task";
import { Newcontext } from "../Context/TaskContext";
import { SquarePen, CircleCheckBig, Trash2 } from "lucide-react";

const Task = ({ task }: TaskItem) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate)

  const label = task.priority === "high" ? "High" :
    task.priority === "medium" ? "Medium" : "Low"

  const priorityColor =
    task.priority === "high" ? "text-red-400" :
      task.priority === "medium" ? "text-yellow-500" : "text-green-400"




  const context = useContext(Newcontext);

  if (!context) {
    return null;
  }

  const { deleteTask, editTask, isCompleted } = context;

  const handleEdit = () => {
    setEditName(task.name)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate)
    setIsEditing(true);
  };

  const handleSave = () => {
    const newTask = {
      ...task,
      name: editName,
      priority: editPriority,
      dueDate: editDueDate
    };

    editTask(newTask, task.id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(task.name);
    setEditDueDate(task.dueDate)
    setEditPriority(task.priority)
    setIsEditing(false);
  };

  return (
    <>

      <div className="flex w-full items-center gap-3 px-4 py-4 transition hover:bg-white/5 sm:px-5">


        <div className="shrink-0">
          {task.isCompleted ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
              <CircleCheckBig
                size={20}
                className="text-green-400"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full border-2 border-white/20" />
          )}
        </div>


        <div className="min-w-0 flex-1">
          <h3
            className={`wrap-break-word text-sm font-semibold sm:text-base ${task.isCompleted
              ? "text-white/40 line-through decoration-2 decoration-red-500"
              : "text-white"
              }`}
          >
            {task.name}
          </h3>

          <p className="mt-1 text-xs text-white/40 sm:text-sm">
            {task.isCompleted ? "Completed" : "Added today"}
          </p>
          <p className={`mr-1 text-xs sm:text-sm ${priorityColor}`}>
            {label}
          </p>
        </div>


        {!task.isCompleted && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleEdit}
              className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-400/10 hover:text-blue-300"
              aria-label="Edit task"
            >
              <SquarePen size={18} />
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => isCompleted(task.id)}
              className="rounded-lg p-2 text-green-400 transition hover:bg-green-400/10 hover:text-green-300"
              aria-label="Complete task"
            >
              <CircleCheckBig size={18} />
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#181d39] p-6 shadow-2xl">

            <button
              onClick={handleCancel}
              className="absolute right-4 top-3 text-2xl text-white/50 transition hover:text-red-400"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="mb-5 text-lg font-semibold text-white">
              Edit Task
            </h2>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-blue-400/50"
            />



            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-white/80">
                Priority
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEditPriority("low")}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${editPriority === "low"
                    ? "border-green-400/50 bg-green-400/10 text-green-400"
                    : "border-white/10 bg-[#181d39] text-white/50 hover:bg-white/5"
                    }`}
                >
                  Low
                </button>

                <button
                  type="button"
                  onClick={() => setEditPriority("medium")}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${editPriority === "medium"
                    ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                    : "border-white/10 bg-[#181d39] text-white/50 hover:bg-white/5"
                    }`}
                >
                  Medium
                </button>

                <button
                  type="button"
                  onClick={() => setEditPriority("high")}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${editPriority === "high"
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
                htmlFor="edit-due-date"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Due Date
              </label>

              <input
                id="edit-due-date"
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#181d39] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400/50"
              />
            </div>



            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;


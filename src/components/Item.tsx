import { useState } from "react";
import type { BackendTask } from "../types/task";
import { SquarePen, Trash2 } from "lucide-react";

type ItemProps = {
  task: BackendTask;

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

const Task = ({
  task,
  onDeleteTask,
  onUpdateTask
}: ItemProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(
    task.due_date?.slice(0, 10) ?? ""
  );

  const isCompleted = task.status === "completed";

  const label =
    task.priority === "high" ? "High" :
      task.priority === "medium" ? "Medium" : "Low";

  const priorityColor =
    task.priority === "high" ? "text-red-400" :
      task.priority === "medium" ? "text-yellow-500" :
        "text-green-400";

  const handleEdit = () => {
    setEditName(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.due_date?.slice(0, 10) ?? "");
    setUpdateError("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editName.trim() || isSaving) return;

    setIsSaving(true);
    setUpdateError("");

    try {
      const success = await onUpdateTask(
        task.id,
        editName.trim(),
        task.description,
        editPriority,
        editDueDate || null,
        task.status === "completed" ? "completed" : "pending"
      );

      if (success) {
        setIsEditing(false);
      } else {
        setUpdateError("Failed to update task. Please try again.");
      }
    } catch {
      setUpdateError("Failed to update task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditName(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.due_date?.slice(0, 10) ?? "");
    setUpdateError("");
    setIsEditing(false);
  }

  const handleToggleComplete = async () => {
    if (isUpdatingStatus) return;

    setIsUpdatingStatus(true);
    setUpdateError("");
    try {
      const success = await onUpdateTask(
        task.id,
        task.title,
        task.description,
        task.priority,
        task.due_date?.slice(0, 10) ?? null,
        isCompleted ? "pending" : "completed"
      );
      if (!success) {
        setUpdateError("Failed to update task status. Please try again.");
      }
    } catch {
      setUpdateError("Failed to update task status. Please try again.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>

      <div className="flex w-full items-center gap-3 px-4 py-4 transition hover:bg-white/5 sm:px-5">
        <div className="min-w-0 flex-1">
          <h3
            className={`wrap-break-word text-sm font-semibold sm:text-base ${isCompleted
              ? "text-white/40 line-through decoration-2 decoration-red-500"
              : "text-white"
              }`}
          >
            {task.title}
          </h3>

          <p className="mt-1 text-xs text-white/40 sm:text-sm">
            {isCompleted ? "Completed" : "Pending"}
          </p>
          <p className={`mr-1 text-xs sm:text-sm ${priorityColor}`}>
            {label}
          </p>
          {task.due_date && (
            <p className="mt-1 text-xs text-white/50">
              Due {task.due_date.slice(0, 10)}
            </p>
          )}
        </div>
        <div className="shrink-0">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => void handleToggleComplete()}
            disabled={isUpdatingStatus}
            aria-label={`Mark ${task.title} as completed`}
            className="h-6 w-6 cursor-pointer accent-green-500 disabled:cursor-wait"
          />
        </div>

        {!isCompleted && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleEdit}
              className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-400/10 hover:text-blue-300"
              aria-label="Edit task"
            >
              <SquarePen size={18} />
            </button>

            <button
              onClick={() => void onDeleteTask(task.id)}
              className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {updateError && !isEditing && (
        <p role="alert" className="px-5 pb-3 text-sm text-red-400">
          {updateError}
        </p>
      )}

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

            <label
              htmlFor={`edit-priority-${task.id}`}
              className="mb-2 mt-5 block text-sm font-medium text-white/80"
            >
              Priority
            </label>
            <select
              id={`edit-priority-${task.id}`}
              value={editPriority}
              onChange={(e) =>
                setEditPriority(e.target.value as "low" | "medium" | "high")
              }
              className="w-full rounded-xl border border-white/10 bg-[#181d39] px-4 py-3 text-sm text-white outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label
              htmlFor={`edit-due-date-${task.id}`}
              className="mb-2 mt-5 block text-sm font-medium text-white/80"
            >
              Due Date
            </label>
            <input
              id={`edit-due-date-${task.id}`}
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#181d39] px-4 py-3 text-sm text-white outline-none"
            />

            {updateError && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {updateError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !editName.trim()}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;

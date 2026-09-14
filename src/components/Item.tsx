import { useContext, useState } from "react";
import { type TaskItem } from "../types/task";
import { Newcontext } from "../Context/TaskContext";
import { SquarePen, CircleCheckBig, Trash2 } from "lucide-react";

const Task = ({ task }: TaskItem) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(task.name)


  const context = useContext(Newcontext);

  if (!context) {
    return null;
  }

  const { deleteTask, editTask, isCompleted } = context;
  const handleEdit = () => {
    setIsEditing(true)
  }


  const handleSave = () => {
    const newTask = {
      ...task, name: editName
    }
    editTask(newTask, task.id)
    setIsEditing(false)
  }
  const handleCancel = () => {
    setEditName(task.name)
    setIsEditing(false)

  }



  return (

    <div className="mt-4 flex w-full items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg sm:p-5">
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md h-50 rounded 2xl border border-white bg-[#181d39] p-6 shadow-2xl">
            <button
              onClick={handleCancel}
              className="absolute right-4 top-0 text-2xl text-white/60 hover:text-red-600"
            >
              ×
            </button>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/60"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl border border-white/5 bg-white/5 p-2.5 text-sm text-yellow-400 shadow-md transition-all hover:bg-yellow-500 hover:text-white sm:text-base"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="rounded-xl border border-white/5 bg-white/5 p-2.5 text-sm text-red-400 shadow-md transition-all hover:bg-red-500 hover:text-white sm:text-base"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>

      )}
      <div className="min-w-0 flex-1">
        <h3 className={`relative wrap-break-word text-lg font-semibold text-white sm:text-xl ${task.isCompleted
          ? "line-through decoration-2 decoration-red-500 after:absolute after:left-0 after:right-0 after:top-1/2 after:h-0.5 after:-translate-y-1/2 after:bg-red-500"
          : ""
          }`}>
          {task.name}
        </h3>


        <p className="text-sm text-white/80 sm:text-base">
          {task.isCompleted ? "Completed" : "Pending"}
        </p>

      </div>


      {!task.isCompleted && (

        <div className="flex items-center gap-4">
          <button
            onClick={handleEdit}
            className="text-blue-400 transition hover:text-blue-300"
          >
            <SquarePen size={22} />
          </button>


          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-400 transition hover:text-red-300"
          >
            <Trash2 size={22} />
          </button>

          <button
            onClick={() => isCompleted(task.id)}
            className="text-green-400 transition hover:text-green-300"
          >
            <CircleCheckBig size={22} />
          </button>


        </div>
      )}

    </div>


  );

};

export default Task;
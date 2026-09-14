import { Newcontext } from "../Context/TaskContext";
import { useContext, useState } from "react";

const Form = () => {
  const [name, setName] = useState("");

  const todoContext = useContext(Newcontext);

  if (!todoContext) {
    return null;
  }

  const { addTask } = todoContext;

  const handleAdd = () => {
    if (name.trim() === "") {
      return;
    }

    addTask(name);
    setName("");
  };
  return (
    <div className="w-full rounded-2xl overflow-x-hidden bg-[#23284a] p-4 shadow-lg sm:p-6 md:p-8">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Add a task..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-white placeholder:text-white/80 placeholder:text-sm outline-none"
        />

        <button
          onClick={handleAdd}
          className="w-full shrink-0 rounded-xl border border-white/40 bg-amber-400 px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-[#ff9900] hover:bg-[#ff9900] sm:w-auto"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
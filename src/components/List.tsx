import { useContext } from "react";
import { Newcontext } from "../Context/TaskContext";
import Items from "./Item";

function List() {
  const context = useContext(Newcontext);

  if (!context) {
    return null;
  }

  const { task } = context;

  return (
    <div className="space-y-4">
      {task.map((task) => (
        <Items key={task.id} task={task} />
      ))}
    </div>
  );
}

export default List;
/*   import { useContext } from "react";
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

export default List;  */



/// Each user shall se its own tasks
import { useContext } from "react";
import { Newcontext } from "../Context/TaskContext";
import Items from "./Item";
import type { AuthState } from "../types/task"
import { useSelector } from "react-redux";


function List() {
  const context = useContext(Newcontext);
  const user = useSelector((state: { auth: AuthState }) => state.auth.user);


  if (!context || !user) {
    return null;
  }

  const { task } = context;
  const usertasks = task.filter((task) => task.userEmail === user.email)

  return (
    <div className="space-y-4">
      {usertasks.map((task) => (
        <Items key={task.id} task={task} />
      ))}
    </div>
  );
}

export default List;;
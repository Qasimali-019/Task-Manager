import { createContext, useEffect, useState } from "react"
import type { TodoContext, TodoContextProp, Task } from "../types/task";

export const Newcontext = createContext<TodoContext | undefined>(undefined);

export const TodoContextProvider = (props: TodoContextProp) => {
    const [task, setTask] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem("task-manager-tasks")
        if (storedTasks) {
            return JSON.parse(storedTasks) as Task[];
        } else {
            return [];
        }
    })

    useEffect(() => {
        localStorage.setItem("task-manager-tasks",
            JSON.stringify(task))
    }, [task])



    const addTask = (name: string, userEmail: string, priority: "low" | "medium" | "high", dueDate: string) => {      //userEmail added to give seperate dashboards to seperate users
        const newTask: Task = {
            id: Date.now(),
            name: name,
            isCompleted: false,
            userEmail: userEmail,
            priority: priority,
            dueDate: dueDate,
            createdAt: new Date().toISOString()
        }
        setTask((prevTask) => [newTask, ...prevTask])
    }

    const editTask = (newTask: Task, id: number) => {
        setTask((prev) => {
            const newArray = prev.map((task) => {
                if (task.id === id) {
                    return { ...newTask, id: task.id }
                }
                return task
            })
            return newArray
        })
    }

    const deleteTask = (id: number) => {
        setTask((prev) => {

            return prev.filter((task) => task.id !== id)
        })
    }

    const isCompleted = (id: number) => {
        setTask((prev) => {
            return prev.map((task) => {
                if (task.id == id) {
                    return { ...task, isCompleted: !task.isCompleted }
                }
                return task
            })
        })
    }

    return (
        <Newcontext.Provider value={{
            task,
            setTask,
            addTask,
            editTask,
            deleteTask,
            isCompleted
        }}>

            {props.children}

        </Newcontext.Provider>

    )
}

export default TodoContextProvider

import type { SetStateAction, Dispatch, ReactNode } from "react"

export type Task = {
    id: number,
    name: string,
    isCompleted: boolean,
    userEmail: string,                            // to give authorized user it own tasks/dashboard(not one dashboard access by all)
    priority: "low" | "medium" | "high",         // added for dashboard cards
    dueDate: string

}

export type TodoContext = {
    task: Task[]
    setTask: Dispatch<SetStateAction<Task[]>>
    addTask: (name: string, userEmail: string, priority: "low" | "medium" | "high", dueDate: string) => void   // added useremail 
    editTask: (newTask: Task, id: number) => void
    deleteTask: (id: number) => void
    isCompleted: (id: number) => void
}

export type TodoContextProp = {
    children: ReactNode
}

export type TaskItem = {
    task: Task
}

export type User = {
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
}

export type AuthState = {
    user: null | User,
    users: User[],
    isLoggedIn: boolean,
}

export type LoginData = {
    email: string;
    password: string;
};


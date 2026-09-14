import type { SetStateAction, Dispatch, ReactNode } from "react"

export type Task = {
    id: number,
    name: string,
    isCompleted: boolean,
}

export type TodoContext = {
    task: Task[]
    setTask: Dispatch<SetStateAction<Task[]>>
    addTask: (name: string) => void
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
    password: string
}

export type AuthState = {
    user: User | null,
    isLoggedIn: boolean,
    password: string
}

export type LoginData = {
    email: string;
    password: string;
};
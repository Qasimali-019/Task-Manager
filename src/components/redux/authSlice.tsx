import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, LoginData, User } from "../../types/task"

const storedAuth = localStorage.getItem("task-manager-auth")

const initialState: AuthState = storedAuth
    ? JSON.parse(storedAuth) as AuthState
    : {
        users: [],
        user: null,
        isLoggedIn: false,
    }


// made the resuable function to use in login as well 
export const findCurrentUser = (users: User[], email: string, password: string) => {
    const currentUser = users.find((user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    )

    return currentUser
}

const saveAuth = (state: AuthState) => {
    localStorage.setItem("task-manager-auth", JSON.stringify(state))
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        Signup: (state, action: PayloadAction<User>) => {
            const newUser: User = {
                ...action.payload,
                role: "user"
            }
            state.users.push(newUser)
            state.user = null
            state.isLoggedIn = false
            saveAuth(state)
        },

        login: (state, action: PayloadAction<LoginData>) => {
            const { email, password } = action.payload
            const currentUser = findCurrentUser(state.users, email, password)


            // removed pasword; so it won't show up in local storage
            if (currentUser) {
                state.user = currentUser
                state.isLoggedIn = true
            } else {
                state.user = null
                state.isLoggedIn = false
            }

            saveAuth(state)
        },


        logout: (state) => {
            state.user = null,
                state.isLoggedIn = false
            saveAuth(state)
        }
    }
})

export const { login, logout, Signup } = authSlice.actions
export default authSlice.reducer

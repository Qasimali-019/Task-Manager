import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, LoginData, User } from "../../types/task"

const storedAuth = localStorage.getItem("task-manager-auth")

const initialState: AuthState = storedAuth
    ? JSON.parse(storedAuth) as AuthState
    : {
        user: null,
        isLoggedIn: false,
        password: ""
    }

const saveAuth = (state: AuthState) => {
    localStorage.setItem("task-manager-auth", JSON.stringify(state))
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        Signup: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.password = action.payload.password
            state.isLoggedIn = false
            saveAuth(state)

        },


        login: (state, action: PayloadAction<LoginData>) => {
            if (
                state.user &&
                state.user.email === action.payload.email &&
                state.password === action.payload.password
            ) {
                state.isLoggedIn = true
                saveAuth(state)
                return
            }

            state.isLoggedIn = false
            saveAuth(state)
        },

        logout: (state) => {
            state.user = null,
                state.isLoggedIn = false
            state.password = ""
            localStorage.removeItem("task-manager-auth")
        }
    }
})

export const { login, logout, Signup } = authSlice.actions
export default authSlice.reducer

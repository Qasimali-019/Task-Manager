import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, LoginData, User } from "../../types/task"

const storedAuth = localStorage.getItem("task-manager-auth")

const initialState: AuthState = storedAuth
    ? JSON.parse(storedAuth) as AuthState
    : {
        users: [],
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
            state.users.push(action.payload)
            state.user = null
            state.password = ""
            state.isLoggedIn = false
            saveAuth(state)


        },


        login: (state, action: PayloadAction<LoginData>) => {
            const foundUser = state.users.find(
                (user) =>
                    user.email.toLowerCase() ===
                    action.payload.email.toLowerCase() &&
                    user.password === action.payload.password
            )

            if (foundUser) {
                state.user = foundUser
                state.password = foundUser.password
                state.isLoggedIn = true
            } else {
                state.user = null
                state.password = ""
                state.isLoggedIn = false
            }

            saveAuth(state)
        },
        /* logout: (state) => {                  state.user = null was deleting the user after logging out,user after creating account can login only once or 
                                                                    for login user do need to create account everytime
             state.user = null,
                 state.isLoggedIn = false
 
         }    */


        logout: (state) => {
            state.isLoggedIn = false
            saveAuth(state)
        }
    }
})

export const { login, logout, Signup } = authSlice.actions
export default authSlice.reducer

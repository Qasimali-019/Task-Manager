import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
};

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    isLoggedIn: boolean;
};

const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{
                user: AuthUser;
                token: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },

        createAdmin: (state) => {
            state.user = {
                id: 1,
                name: "Admin",
                email: "admin@gmail.com",
                role: "admin"
            };
            state.token = "test-admin-token";
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});

export const { login, createAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
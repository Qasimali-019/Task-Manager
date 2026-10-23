import { useDispatch, useSelector } from "react-redux";
import { login, logout, createAdmin } from "./redux/authSlice";

function AuthTest() {

    const dispatch = useDispatch()
    const { user, isLoggedIn } = useSelector((state: {
        auth: {
            user: { name: string; email: string; role: "admin" | "user" } | null;
            isLoggedIn: boolean;
        };
    }) => state.auth)

    const handleLogin = (email: string) => {
        const isAdmin = email === "admin@gmail.com";

        dispatch(login({
            user: {
                id: isAdmin ? 1 : 2,
                name: isAdmin ? "Admin" : "Test User",
                email,
                role: isAdmin ? "admin" : "user"
            },
            token: "test-auth-token"
        }))
    }


    const handleCreateAdmin = () => {
        dispatch(createAdmin());
    };
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <h1>Auth Test</h1>

            <p>
                Logged in: {isLoggedIn ? "Yes" : "No"}
            </p>

            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}


            <button onClick={handleCreateAdmin}>
                Create Admin
            </button>

            <button onClick={() => handleLogin("qasim.aliii019@gmail.com")}>Login user</button>


            <button onClick={() => handleLogin("admin@gmail.com")}>Login admin</button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AuthTest;
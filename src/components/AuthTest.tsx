import { useDispatch, useSelector } from "react-redux";
import { login, logout, createAdmin } from "./redux/authSlice";

function AuthTest() {

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.user)
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)

    const handleLogin = (email: string, password: string) => {
        dispatch(login({
            email,
            password
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

            <button onClick={() => handleLogin(
                "qasim.aliii019@gmail.com",
                "Q@sim1234"
            )}>Login user</button>


            <button onClick={() => handleLogin(
                "admin@gmail.com",
                "admin1234"
            )}>Login admin</button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AuthTest;
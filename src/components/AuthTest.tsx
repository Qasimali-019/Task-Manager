import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/authSlice";

function AuthTest() {

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.user)
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)

    const handleLogin = () => {
        dispatch(login({
            email: "qasim.aliii019@gmail.com",
            password: "password"
        }))
    }
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

            <button onClick={handleLogin}>Login</button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AuthTest;
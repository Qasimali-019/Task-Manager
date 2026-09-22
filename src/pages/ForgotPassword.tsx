import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AuthState } from "../types/task";
import { resetPassword } from "../components/redux/authSlice";

function ForgotPassword() {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state: { auth: AuthState }) => state.auth.users);

    const [email, setEmail] = useState("")
    const [newPassword, setNewPasswword] = useState("")
    const [confirmNewPassword, setConfirmNewPasswword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")



    const handleResetPassword = (e: FormEvent) => {
        e.preventDefault()

        setError("")
        setSuccess("")

        if (!email.trim() || !newPassword || !confirmNewPassword) {
            setError("all fileds are required")
            return
        }
        if (newPassword != confirmNewPassword) {
            setError("passwords didn't match")
            return
        }
        const userExist = users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase())
        if (!userExist) {
            setError("No account found")
            return
        }


        disptach(
            resetPassword({
                email: email.trim(),
                newPassword
            })
        )


        setSuccess("Password reset successfully")
        setTimeout(() => {
            navigate("/login")
        }, 2000);
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-[#101631] px-4">
            <div className="w-full max-w-md rounded-2xl border-2 border-blue-400 bg-[#161d39] p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-white">
                    Forgot Password
                </h1>
                <p className="mb-8 text-center text-gray-400">
                    Enter your email and choose a new password.
                </p>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md border-2 border-pink-500 bg-[#181d31] px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPasswword(e.target.value)}
                        className="rounded-md border-2 border-pink-500 bg-[#181d31] px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPasswword(e.target.value)}
                        className="rounded-md border-2 border-pink-500 bg-[#181d31] px-4 py-3 text-white placeholder-gray-300 outline-none focus:border-blue-400"
                    />

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {success && <p className="text-sm text-green-400">{success}</p>}

                    <button
                        type="submit"
                        className="rounded-md bg-[#00AFFF] py-3 text-lg font-bold text-white transition-colors hover:bg-[#008acb]"
                    >
                        Reset Password
                    </button>

                    <Link to="/login" className="text-center text-[#00AFFF] hover:underline">
                        Back to Login
                    </Link>
                </form>

            </div>
        </div>
    );
}

export default ForgotPassword;





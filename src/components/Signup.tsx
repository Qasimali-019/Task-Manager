import { useState } from "react";
import { useDispatch } from "react-redux";
import { Signup } from "../components/redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            return;
        }

        dispatch(
            Signup({
                name,
                email,
                password,
            })
        );

        navigate("/login")
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101631]">
            <div className="relative bg-[#161d39] rounded-2xl border-2 border-blue-400 px-8 pt-16 pb-8 w-full max-w-md shadow-lg">
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white border-4 border-pink-500 rounded-full flex items-center justify-center h-28 w-28">
                        <svg
                            viewBox="0 0 24 24"
                            fill="#00AFFF"
                            className="h-20 w-20"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <ellipse cx="12" cy="17" rx="7" ry="5" />
                        </svg>
                    </div>
                </div>
                <form onSubmit={handleSignup} className="flex flex-col gap-5 mt-8">
                    <input
                        type="name"
                        placeholder="Name"
                        className="bg-[#181d31] border-2 border-pink-500 text-white placeholder-gray-300 rounded-md px-4 py-3 focus:border-blue-400 outline-none"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-[#181d31] border-2 border-pink-500 text-white placeholder-gray-300 rounded-md px-4 py-3 focus:border-blue-400 outline-none"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-[#181d31] border-2 border-pink-500 text-white placeholder-gray-300 rounded-md px-4 py-3 focus:border-blue-400 outline-none"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-[#00AFFF] hover:bg-[#008acb] text-white text-lg font-bold rounded-md py-3 transition-colors duration-200 uppercase tracking-wider"
                    >
                        Signup
                    </button>

                    <p className="text-white mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#00AFFF] hover:underline font-bold"
                        >
                            LOGIN
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
export default SignupPage;
import { Link } from "react-router-dom";

function ForgotPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#101631] px-4">
            <div className="w-full max-w-md rounded-2xl border-2 border-blue-400 bg-[#161d39] p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-white">
                    Forgot Password
                </h1>
                <p className="mb-8 text-center text-gray-400" role="status">
                    Password reset is not available yet. Please contact an
                    administrator for help.
                </p>

                <div className="flex flex-col gap-5">
                    <Link to="/login" className="text-center text-[#00AFFF] hover:underline">
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;




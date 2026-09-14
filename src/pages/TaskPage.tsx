import Form from "../components/Form";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import type { AuthState } from "../types/task";
import { useNavigate } from "react-router-dom";
import { logout } from "../components/redux/authSlice";

function TaskPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(
        (state: { auth: AuthState }) => state.auth.user
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#181d39] px-4 py-8 sm:px-6 md:px-8 lg:px-12">

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center">

                {/* Header */}
                <div className="relative w-full">


                    <button
                        onClick={handleLogout}
                        className="
                            absolute right-0 top-0
                            rounded-md
                            bg-red-500
                            px-4 py-2
                            text-sm font-bold text-white
                            transition-colors duration-200
                            hover:bg-red-600
                            sm:px-5 sm:py-2
                            sm:text-base
                        "
                    >
                        Logout
                    </button>

                    {/* Task Manager Heading */}
                    <h1
                        className=" px-20
                            text-center
                            text-3xl
                            font-bold
                            uppercase
                            leading-tight
                            text-white
                            sm:px-24
                            sm:text-5xl
                            md:px-28
                            md:text-6xl
                            lg:px-0
                            lg:text-7xl
                        "
                    >
                        TASK MANAGER
                    </h1>

                    {/* Username */}
                    <p
                        className="
                            mt-3
                            text-center
                            text-lg
                            font-semibold
                            text-white
                            sm:text-xl
                            md:text-2xl
                        "
                    >
                        Hello {user?.name}
                    </p>

                </div>

                {/* Form */}
                <div className="mt-8 w-full max-w-3xl overflow-hidden">
                    <Form />
                </div>

                {/* Task List */}
                <div className="mt-6 w-full max-w-3xl overflow-hidden">
                    <List />
                </div>

            </div>

        </div>
    );
}

export default TaskPage;
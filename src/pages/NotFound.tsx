
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen bg-[#101631] flex items-center justify-center px-4">
            <div className="text-center text-white">

                <h1 className="text-8xl sm:text-9xl font-bold text-[#00AFFF]">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-bold mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-400 mt-3 max-w-md mx-auto">
                    Sorry, the page you are looking for doesn't exist or
                    may have been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-8 bg-[#00AFFF] hover:bg-[#008acb] text-white font-bold px-6 py-3 rounded-md transition-colors"
                >
                    Go Home
                </Link>

            </div>
        </div>
    );
}

export default NotFound;


import { useNavigate } from "react-router-dom";

export default function RouteError() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white">404</h1>

        <p className="mt-4 text-xl font-semibold text-white">
          Page not found
        </p>

        <p className="mt-2 text-slate-400">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Go home
        </button>
      </div>
    </div>
  );
}
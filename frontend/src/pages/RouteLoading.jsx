import { LoaderCircle } from "lucide-react";

export default function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <LoaderCircle className="mx-auto animate-spin text-indigo-500" size={40} />

        <h2 className="mt-4 text-lg font-semibold text-white">
          Loading...
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Checking your session
        </p>
      </div>
    </div>
  );
}
import{ useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Layers } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.73z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1C3.25 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.27a12 12 0 0 0 0 10.8l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function Stamp({ confidence = 92 }) {
  return (
    <div className="w-16 h-16 shrink-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-amber-500 text-amber-700 bg-amber-50/60 -rotate-6 select-none">
      <span className="font-mono font-bold leading-none text-base">{confidence}%</span>
      <span className="font-mono text-[8px] tracking-widest mt-1 text-center leading-tight px-1">
        LIKELY
        <br />
        REPEAT
      </span>
    </div>
  );
}

/**
 * Params:
 * - initialMode: "signin" | "signup" — which tab to open on
 * - onAuthenticated: called after email/password submit succeeds
 * - onGoogleAuth: called when the Google button is clicked
 * - onBack: called when the user taps the logo/back link
 */
export default function SignUpPage({ initialMode = "signin", onAuthenticated, onBack, onGoogleAuth }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Wire this up to your real auth call — mocked here with a short delay.
    setTimeout(() => {
      setLoading(false);
      onAuthenticated?.();
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Left brand panel — hidden below lg */}
      <div className="hidden lg:flex lg:w-[42%] shrink-0 bg-stone-900 text-stone-100 flex-col justify-between p-10 xl:p-12">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="font-mono font-bold text-stone-900 text-sm">R</span>
          </div>
          <span className="font-semibold text-white tracking-tight">Recurra</span>
        </div>

        <div>
          <h2 className="text-2xl xl:text-3xl font-bold leading-tight mb-4">
            Every exam repeats itself.
            <br />
            <span className="text-stone-400">We show you how.</span>
          </h2>
          <div className="flex items-center gap-4 mt-8">
            <Stamp confidence={92} />
            <p className="text-sm text-stone-400 leading-relaxed max-w-[220px]">
              Deadlock in Operating Systems — seen 7× since 2019, due again this term.
            </p>
          </div>
        </div>

        <p className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> built for students who'd rather study than guess
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 sm:px-8 py-6 flex items-center justify-between lg:justify-end">
          <button
            onClick={onBack}
            className="lg:hidden flex items-center gap-2 text-stone-700"
            aria-label="Back to homepage"
          >
            <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="font-mono font-bold text-stone-900 text-sm">R</span>
            </div>
            <span className="font-semibold tracking-tight">Recurra</span>
          </button>
          <button onClick={onBack} className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
            Back to home
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-stone-900 mb-1">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-stone-500 mb-8">
              {isSignUp
                ? "Start finding the questions that keep coming back."
                : "Sign in to see this term's predicted questions."}
            </p>

            {/* Google button */}
            <button
              type="button"
              onClick={onGoogleAuth}
              className="w-full flex items-center justify-center gap-3 border border-stone-300 bg-white text-stone-700 text-sm font-medium py-2.5 sm:py-3 rounded-md hover:bg-stone-50 hover:border-stone-400 transition-colors"
            >
              <GoogleIcon />
              {isSignUp ? "Sign up with Google" : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-stone-200" />
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                {isSignUp ? "or sign up with email" : "or sign in with email"}
              </span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    autoComplete="name"
                    required
                    className="w-full pl-9 pr-3 py-2.5 sm:py-3 text-sm rounded-md border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="w-full pl-9 pr-3 py-2.5 sm:py-3 text-sm rounded-md border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  className="w-full pl-9 pr-10 py-2.5 sm:py-3 text-sm rounded-md border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {!isSignUp && (
                <div className="flex justify-end -mt-1">
                  <button type="button" className="text-xs font-medium text-teal-700 hover:text-teal-800">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white text-sm font-medium py-2.5 sm:py-3 rounded-md hover:bg-stone-800 transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create account" : "Sign in"} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {isSignUp && (
                <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                  By creating an account you agree to Recurra's Terms of Service and Privacy Policy.
                </p>
              )}

              <p className="text-sm text-stone-600 text-center pt-2">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(isSignUp ? "signin" : "signup")}
                  className="font-medium text-teal-700 hover:text-teal-800"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
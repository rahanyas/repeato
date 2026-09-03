import{ useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Layers } from "lucide-react";


import GoogleIcon from "../components/shared/GoogleIcon";
import Stamp from "../components/shared/Stamp";

import axiosInstance from "../utils/axiosWrapper";
import { useMessage } from "../context/Message.context";

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

  const { showMessage, message } = useMessage();

  const [data, setData] = useState({
    name : '',
    email : '',
    pass : ''
  })

//  async function siginIn(data){
//   try {
//     const res = await axiosInstance.post('/api/auth/sigin-in', data)
//   } catch (err) {
//     console.log('err from sign-in func ',err)
//   }
// }


 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/auth/sign-in', data);
      console.log('res from handle submut : ', res)
      if(res.status === 201){
        showMessage(res?.data?.msg, 'success');
        console.log('show message ', message)
        onAuthenticated?.();
      }
    } catch (err) {
      console.log('err from sign-in func : ', err);
      showMessage(err.response?.data?.msg || 'Login Failed', "error")
    }finally{
      setLoading(false)
    }
    // Wire this up to your real auth call — mocked here with a short delay.
    // setTimeout(() => {
    //   setLoading(false);
    //   onAuthenticated?.();
    // }, 600);
  };

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Left brand panel — hidden below lg */}
      <div className="hidden lg:flex lg:w-[42%] shrink-0 bg-stone-900 text-stone-100 flex-col justify-between p-10 xl:p-12">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="font-mono font-bold text-stone-900 text-sm">R</span>
          </div>
          <span className="font-semibold text-white tracking-tight">Repeato</span>
        </div>

        <div>
          <h2 className="text-2xl xl:text-3xl font-bold leading-tight mb-4">
            Every exam repeats itself.
            <br />
            <span className="text-stone-400">We show you how.</span>
          </h2>
          <div className="flex items-center gap-4 mt-8">
            <Stamp confidence={92} />
            <p className="text-sm text-stone-400 leading-relaxed max-w-55">
              Deadlock in Operating Systems — seen 7× since 2015, due again this term.
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
                    onChange={(e) => setData(prev => ({...prev, name : e.target.value }))}
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
                  onChange={(e) => setData(prev => ({...prev, email : e.target.value}))}
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
                  onChange={(e) => setData(prev => ({...prev, pass : e.target.value}))}
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
                  By creating an account you agree to Repeato's Terms of Service and Privacy Policy.
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import SignUpModal from "./SignUpModal";
import Lottie from "lottie-react";
import rocketAnimation from "../assets/rocket.json";
import teamIllustration from "../assets/team-illustration.png";

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/welcome");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  const handleEmailLogin = async () => {
    setLoginError("");
    setResetMessage("");
    setResetError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/welcome");
    } catch (error) {
      setLoginError("Incorrect email or password.");
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    setResetError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setResetError("Enter your email address first so we know where to send the reset link.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      setResetMessage(`Password reset email sent to ${trimmedEmail}.`);
    } catch (err) {
      console.error("Password reset error:", err);
      setResetError("We couldn't send the reset email. Double-check the email address and try again.");
    }
  };

  return (
    <div className="page-gradient flex min-h-screen items-center px-4 py-10 sm:py-14">
      <div className="page-shell">
        <div className="mx-auto max-w-6xl">
          <div className="section-shell overflow-hidden">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_0.8fr] lg:p-10">
              <div className="flex flex-col justify-center gap-8">
                <div className="space-y-5">
                  <p className="eyebrow">Arcoria Sign In</p>
                  <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                    Keep moving through your learning arc.
                  </h1>
                  <p className="max-w-xl text-lg font-medium leading-8 text-emerald-800">
                    Learn tech with more structure and a lot less chaos.
                  </p>
                  <p className="app-body max-w-xl">
                    Sign in to keep your learning organized, follow a clearer path, and get extra support whether you're practicing at home or reinforcing what you're learning in school.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                    <p className="text-sm font-semibold text-slate-900">Guided paths</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Turn scattered videos into one focused learning route.</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                    <p className="text-sm font-semibold text-slate-900">Visible progress</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">See what you've finished and what to tackle next.</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                    <p className="text-sm font-semibold text-slate-900">Career-ready practice</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Keep learning at home or alongside school with practice that feels useful.</p>
                  </div>
                </div>

                <div className="hidden overflow-hidden rounded-[1.5rem] border border-emerald-100 bg-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.28)] lg:block">
                  <img
                    src={teamIllustration}
                    alt="People using Arcoria"
                    className="h-56 w-full object-cover"
                  />
                </div>
              </div>

              <div className="mx-auto w-full max-w-md self-center">
                <div className="panel-card space-y-5">
                  <div className="space-y-3 text-center">
                    <Lottie
                      animationData={rocketAnimation}
                      loop
                      className="mx-auto h-20 w-20"
                    />
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                        Welcome back
                      </h2>
                      <p className="text-sm leading-6 text-slate-500">
                        Sign in to open your dashboard, continue a path, and keep your momentum going.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="app-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="app-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={handleEmailLogin}
                      className="btn-primary w-full hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_38px_-16px_rgba(22,163,74,0.9)] active:translate-y-0 active:scale-[0.99]"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGoogleSignIn}
                      className="btn-secondary w-full hover:-translate-y-0.5 hover:scale-[1.01] hover:border-emerald-300 hover:shadow-[0_16px_34px_-20px_rgba(15,23,42,0.35)] active:translate-y-0 active:scale-[0.99]"
                    >
                      Sign In with Google
                    </button>

                    {loginError && <p className="text-sm font-medium text-rose-600">{loginError}</p>}
                    <button
                      onClick={handlePasswordReset}
                      className="text-sm font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
                    >
                      Forgot Password?
                    </button>
                    {resetMessage && <p className="text-sm font-medium text-emerald-700">{resetMessage}</p>}
                    {resetError && <p className="text-sm font-medium text-rose-600">{resetError}</p>}
                  </div>
                </div>

                <div className="mt-4 rounded-[1.25rem] border border-emerald-100 bg-white/80 px-5 py-4 text-center shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">New to Arcoria?</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Create an account to save progress and keep your learning in one place.
                  </p>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="btn-secondary mt-4 w-full hover:-translate-y-0.5 hover:scale-[1.01] hover:border-emerald-300 hover:shadow-[0_16px_34px_-20px_rgba(15,23,42,0.35)] active:translate-y-0 active:scale-[0.99]"
                  >
                    Create Your Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default LoginPage;

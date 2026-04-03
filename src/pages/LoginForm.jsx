import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setError("");
    setResetMessage("");
    setResetError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed.");
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
    <div className="page-gradient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="section-shell w-full max-w-5xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="hidden border-r border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-10 lg:flex lg:items-center lg:justify-center">
            <div className="max-w-sm text-center">
              <p className="eyebrow mb-3">Welcome back</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-4">Continue your Arcoria journey.</h2>
              <p className="text-slate-600">Return to your dashboard, keep your progress visible, and stay focused on the next step in your learning arc.</p>
              
              <img src="/login-graphic.svg" alt="login" className="mx-auto mt-8 max-w-xs" />
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <h3 className="mb-2 text-3xl font-black tracking-tight text-slate-950">Log in now</h3>
            <p className="mb-6 text-sm leading-6 text-slate-500">Sign in to continue learning, track progress, and pick up where you left off.</p>

            <button
              onClick={handleGoogleLogin}
              className="btn-primary mb-4 w-full"
            >
              Sign in with Google
            </button>

            <div className="my-4 text-center text-sm text-slate-400">OR</div>

            <input
              type="email"
              placeholder="Email"
              className="app-input mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="app-input mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="mb-2 text-sm font-medium text-rose-600">{error}</p>}

            <button
              onClick={handleEmailLogin}
              className="btn-secondary w-full"
            >
              Log In
            </button>

            <button
              className="mt-3 text-sm font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </button>

            {resetMessage && <p className="mt-3 text-sm font-medium text-emerald-700">{resetMessage}</p>}
            {resetError && <p className="mt-3 text-sm font-medium text-rose-600">{resetError}</p>}

            <p className="mt-4 text-center text-sm text-slate-500">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer text-emerald-700 hover:underline"
              >
                Start from home
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

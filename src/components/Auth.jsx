import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import Lottie from "lottie-react";
import devAnimation from "../assets/lottie/dev-animation.json";
import SignUpModal from "./SignUpModal";

function Auth({ onAuthChange }) {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("Signed in:", result.user);
        onAuthChange(true);
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    setResetError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setResetError("Enter your email address first so we can send the reset link.");
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
    <div className="page-gradient min-h-screen px-6 py-10">
      <div className="page-shell mb-12 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-emerald-700">Arcoria</h1>
        <div className="space-x-3">
          <button
            onClick={handleGoogleSignIn}
            className="btn-primary px-4 py-2.5"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn-secondary px-4 py-2.5"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="page-shell flex flex-col items-center justify-center gap-12 lg:flex-row">
        <div className="max-w-md space-y-4 text-left">
          <h2 className="text-4xl font-extrabold text-slate-950">
            Welcome to <span className="text-emerald-700">Arcoria</span>
          </h2>
          <p className="text-lg text-slate-600">
            A cleaner way to learn with YouTube, keep your progress in one place, and build skills with more confidence.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Keep your learning journey organized in one place</li>
            <li>Follow curated lesson tracks that are easier to stick with</li>
            <li>Build practical skills at home, on your own schedule, or alongside school</li>
          </ul>
        </div>

        <div className="w-72 lg:w-96">
          <Lottie animationData={devAnimation} loop />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <div className="panel-card">
          <h3 className="mb-2 text-lg font-bold text-slate-900">Sign in to Arcoria</h3>
          <button
            onClick={handleGoogleSignIn}
            className="btn-primary mb-4 w-full"
          >
            Sign in with Google
          </button>

          <input
            type="email"
            placeholder="Enter email for password reset"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="app-input mb-2"
          />
          <button
            onClick={handlePasswordReset}
            className="text-sm text-emerald-700 hover:underline"
          >
            Forgot Password?
          </button>
          {resetMessage && <p className="mt-2 text-xs font-medium text-emerald-700">{resetMessage}</p>}
          {resetError && <p className="mt-2 text-xs font-medium text-rose-600">{resetError}</p>}
        </div>
      </div>

      {showModal && <SignUpModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Auth;

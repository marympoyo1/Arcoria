import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import Lottie from "lottie-react";
import devAnimation from "../assets/lottie/dev-animation.json"; // download from LottieFiles

import SignUpModal from "./SignUpModal";

function Auth({ onAuthChange }) {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

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
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("Password reset email sent!");
    } catch (err) {
      setResetMsg("Enter a valid email first.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen px-6 py-10">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-12 px-4">
        <h1 className="text-2xl font-bold text-green-600">SkillForge</h1>
        <div className="space-x-3">
          <button
            onClick={handleGoogleSignIn}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-100"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
        {/* Info + Lottie */}
        <div className="max-w-md text-left space-y-4">
          <h2 className="text-4xl font-extrabold text-green-600">
            Welcome to <span className="text-gray-900">SkillForge</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Learn the skills you need to level up in tech. Get curated YouTube tutorials, track progress, and follow roadmaps built for beginners.
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Track your progress in real-time</li>
            <li>👨‍💻 Video tutorials powered by YouTube</li>
            <li>🚀 Skill-based learning paths</li>
          </ul>
        </div>

        <div className="w-72 lg:w-96">
          <Lottie animationData={devAnimation} loop />
        </div>
      </div>

      {/* Password Reset */}
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-md rounded p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Sign in to SkillForge</h3>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-4"
          >
            Sign in with Google
          </button>

          <input
            type="email"
            placeholder="Enter email for password reset"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
            onClick={handlePasswordReset}
            className="text-green-600 text-sm hover:underline"
          >
            Forgot Password?
          </button>
          {resetMsg && <p className="text-xs text-gray-500 mt-2">{resetMsg}</p>}
        </div>
      </div>

      {/* Sign Up Modal */}
      {showModal && <SignUpModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Auth;




  
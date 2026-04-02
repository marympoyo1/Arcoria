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
  const [resetMsg, setResetMsg] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setError("");
    setResetMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      setError("Invalid email or password.");
      setResetMsg("Forgot your password?");
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
    if (!email) return setResetMsg("Please enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("Password reset email sent.");
    } catch {
      setResetMsg("Failed to send password reset email.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Info Graphic */}
        <div className="hidden lg:flex w-1/2 bg-green-100 p-10 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-green-600 mb-4">Welcome Back!</h2>
            <p className="text-gray-700">Log in and continue your SkillForge journey.</p>
            <img src="/login-graphic.svg" alt="login" className="mt-6 max-w-xs" />
          </div>
        </div>

        {/* Right Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Log in now!</h3>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4 transition"
          >
            Sign in with Google
          </button>

          <div className="text-gray-400 text-sm text-center my-4">OR</div>

          {/* Email Login */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

          <button
            onClick={handleEmailLogin}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Log In
          </button>

          {resetMsg && (
            <p className="text-sm mt-3 text-green-700">
              <button className="underline" onClick={handlePasswordReset}>
                {resetMsg}
              </button>
            </p>
          )}

          <p className="text-sm mt-4 text-gray-500 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-green-600 hover:underline cursor-pointer"
            >
              Sign up on home page
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

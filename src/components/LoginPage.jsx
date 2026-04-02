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
  const [resetPrompt, setResetPrompt] = useState("");

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/welcome"); // ✅ redirect
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  const handleEmailLogin = async () => {
    setLoginError("");
    setResetPrompt("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/welcome"); // ✅ redirect
    } catch (error) {
      setLoginError("Incorrect email or password.");
      setResetPrompt("Forgot password?");
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setResetPrompt("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetPrompt("Password reset email sent!");
    } catch (err) {
      setResetPrompt("Error sending reset email.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl w-full">
        {/* Left Section */}
        <div className="max-w-xl text-left space-y-5">
          <h2 className="text-4xl font-extrabold text-green-600 leading-tight">
            Learn Tech. Level Up.
          </h2>
          <p className="text-gray-700 text-lg">
            Build your future with curated tech skill paths powered by YouTube
            tutorials. Track progress and grow confidently.
          </p>
          <ul className="text-md space-y-2 text-gray-800">
            <li>✅ Easy-to-follow video guides</li>
            <li>✅ Personalized learning journeys</li>
            <li>✅ Real-time progress tracking</li>
          </ul>

          <img
            src={teamIllustration}
            alt="People using SkillForge"
            className="w-72 rounded-md shadow mt-6"
          />
        </div>

        {/* Right Section */}
        <div className="w-full max-w-sm text-center space-y-4">
          <Lottie
            animationData={rocketAnimation}
            loop
            className="w-40 mx-auto"
          />

          <div>
            <h3 className="text-xl font-bold text-green-600 mb-1">
              Start Learning Today!
            </h3>
            <p className="text-gray-600 text-sm">
              Sign up or log in to explore curated tech paths and track your growth.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleEmailLogin}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Sign In
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-full border border-green-600 text-green-700 py-2 rounded hover:bg-green-100 transition"
            >
              Sign In with Google
            </button>

            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            {resetPrompt && (
              <p className="text-sm mt-1">
                <button
                  onClick={handlePasswordReset}
                  className="text-green-600 underline hover:text-green-800"
                >
                  {resetPrompt}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
};

export default LoginPage;











import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignUpModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[1.75rem] border border-white/70 bg-white p-8 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)]">
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl font-bold text-slate-400 hover:text-slate-700"
        >
          ×
        </button>
        <p className="eyebrow mb-3">Create your account</p>
        <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-950">Join Arcoria</h2>
        <p className="mb-6 text-sm leading-6 text-slate-500">
          Turn your YouTube learning into something more focused, trackable, and easier to stick with.
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="app-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="app-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs leading-5 text-slate-500">
            Create an account to save progress, follow a clearer path, and keep growing from beginner to pro.
          </p>
          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
          {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Create My Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ChooseSkill from './pages/ChooseSkill';
import CourseDetail from './pages/CourseDetail';
import LearnMore from './pages/LearnMore';
import WelcomePage from './pages/WelcomePage';
import StatePanel from './components/StatePanel';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />
      {authLoading ? (
        <div className="page-gradient flex min-h-screen items-center justify-center px-6 py-10">
          <StatePanel message="Getting Arcoria ready for you..." />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/learn-more" element={<LearnMore />} />
          {isLoggedIn ? (
            <>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learning-paths/:id" element={<LearningPath />} />
              <Route path="/choose-skill" element={<ChooseSkill />} />
              <Route path="/course-detail/:pathId/:lessonId" element={<CourseDetail />} />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      )}
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ChooseSkill from './pages/ChooseSkill';
import CourseDetail from './pages/CourseDetail';
import LearnMore from './pages/learnmore';
import WelcomePage from './pages/WelcomePage'; // ✅ New page after login
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const testFirestoreConnection = async () => {
      const testDocRef = doc(db, 'test', 'demo');
      try {
        const snapshot = await getDoc(testDocRef);
        console.log('✅ Firestore connected. Test doc exists:', snapshot.exists());
      } catch (error) {
        console.error('❌ Firestore connection error:', error.message);
      }
    };
    testFirestoreConnection();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/learn-more" element={<LearnMore />} />
        {isLoggedIn ? (
          <>
            <Route path="/welcome" element={<WelcomePage />} /> {/* ✅ new redirect page */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-paths" element={<LearningPath />} />
            <Route path="/choose-skill" element={<ChooseSkill />} />
            <Route path="/course-detail" element={<CourseDetail />} />
            <Route path="*" element={<Navigate to="/welcome" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

















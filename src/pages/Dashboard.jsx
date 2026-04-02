// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, 'userProgress', user.uid);
      const userDoc = await getDoc(userDocRef);

      const allCoursesSnapshot = await getDocs(collection(db, 'courses'));
      const validCourseTitles = allCoursesSnapshot.docs.map((doc) => doc.data().title);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const completed = data.completedCourses || [];
        const filteredCompleted = completed.filter((title) =>
          validCourseTitles.includes(title)
        );
        setCompletedCourses(filteredCompleted);
      }

      setLoading(false);
    };

    fetchProgress();
  }, []);

  const totalCourses = 33;

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Go Back Button */}
        <button
          onClick={() => navigate('/welcome')}
          className="mb-6 inline-flex items-center bg-white text-green-600 border border-green-300 px-4 py-2 rounded-lg shadow hover:bg-green-50 transition"
        >
          ← Back to Welcome
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-green-600 mb-2">Dashboard</h2>
          <p className="text-gray-700 text-lg">
            Welcome back! Track your progress and pick up where you left off.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading your progress...</p>
        ) : (
          <>
            {/* Course Progress */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
              <div className="border-l-4 border-green-500 pl-4 mb-3">
                <h3 className="text-xl font-bold text-gray-800">📚 Course Progress</h3>
              </div>
              <p className="text-gray-700">
                You've completed <span className="text-green-600 font-bold">{completedCourses.length}</span> of <span className="font-semibold">{totalCourses}</span> courses.
              </p>
              <p className="text-sm text-green-600 italic mt-2">
                Keep it up! You're forging your future one course at a time!
              </p>
            </section>

            {/* Recently Completed */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
              <div className="border-l-4 border-green-500 pl-4 mb-3">
                <h3 className="text-xl font-bold text-gray-800">✔ Recently Completed</h3>
              </div>
              {completedCourses.length === 0 ? (
                <p className="text-gray-500">You haven’t completed any courses yet.</p>
              ) : (
                <ul className="space-y-2">
                  {completedCourses.slice(-3).reverse().map((course, idx) => (
                    <li key={idx} className="text-gray-700">
                      ✅ {course} – <span className="text-sm italic text-gray-400">recently completed</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Continue Learning */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
              <div className="border-l-4 border-green-500 pl-4 mb-4">
                <h3 className="text-xl font-bold text-gray-800">📖 Continue Learning</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {["Web Development", "UI/UX Design"].map((skill) => {
                  const allCourses = {
                    'Web Development': [
                      "Intro to HTML & CSS",
                      "Responsive Design",
                      "JavaScript Fundamentals"
                    ],
                    'UI/UX Design': [
                      "Design Thinking",
                      "Wireframing Basics",
                      "Figma 101"
                    ]
                  };

                  const uncompleted = allCourses[skill].filter(course => !completedCourses.includes(course));

                  return (
                    <div
                      key={skill}
                      className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100"
                    >
                      <h4 className="text-green-700 font-semibold text-md mb-3">{skill}</h4>
                      {uncompleted.length > 0 ? (
                        uncompleted.map((title, i) => (
                          <div key={i} className="flex items-center justify-between mb-2">
                            <span className="text-gray-700 text-sm">📘 {title}</span>
                            <button
                              onClick={() => navigate(`/learning-paths?skill=${encodeURIComponent(skill)}`)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded transition"
                            >
                              Continue
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">You’re all caught up in {skill}!</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;








  
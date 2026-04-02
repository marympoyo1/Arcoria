import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import CourseCard from '../components/CourseCard';

const LearningPath = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const skill = params.get('skill');

  const [completedCourses, setCompletedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const allCourses = querySnapshot.docs.map((doc) => doc.data());
        const filtered = skill
          ? allCourses.filter((course) => course.skill === skill)
          : allCourses;
        setCourses(filtered);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [skill]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const userDocRef = doc(db, 'userProgress', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setCompletedCourses(data.completedCourses || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStartCourse = (course) => {
    navigate('/course-detail', { state: { course } });
  };

  const handleMarkComplete = (courseTitle, isNowComplete) => {
    setCompletedCourses((prev) =>
      isNowComplete
        ? [...prev, courseTitle]
        : prev.filter((title) => title !== courseTitle)
    );
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Go Back Button */}
        <button
          onClick={() => navigate('/choose-skill')}
          className="mb-8 inline-block bg-white text-green-600 border border-green-300 px-4 py-2 rounded hover:bg-green-50 transition"
        >
          ← Go Back to Choose Skill
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-green-600 mb-2">
            {skill ? `${skill} Learning Path` : 'Learning Path'}
          </h2>
          <p className="text-lg text-gray-600">
            {skill
              ? <>Explore your personalized journey to mastering <span className="font-medium">{skill}</span>.</>
              : 'Select a skill to view its learning path.'}
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                level={course.level}
                description={course.description}
                progress={course.progress || 0}
                onStart={() => handleStartCourse(course)}
                isCompleted={completedCourses.includes(course.title)}
                onMarkComplete={handleMarkComplete}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-6">
            No courses found for this skill. Please go back and choose a valid path.
          </p>
        )}
      </div>
    </div>
  );
};

export default LearningPath;


















  
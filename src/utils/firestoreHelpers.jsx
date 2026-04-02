import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// ✅ Mark a course as complete
export const markCourseComplete = async (userId, courseTitle) => {
  if (!userId || !courseTitle) return;

  const userDocRef = doc(db, 'userProgress', userId);

  try {
    await setDoc(
      userDocRef,
      { completedCourses: arrayUnion(courseTitle) },
      { merge: true }
    );
    console.log(`✅ Saved '${courseTitle}' for user: ${userId}`);
  } catch (error) {
    console.error("❌ Error saving course progress:", error);
  }
};

// ❌ Unmark a course as complete
export const unmarkCourseComplete = async (userId, courseTitle) => {
  if (!userId || !courseTitle) return;

  const userDocRef = doc(db, 'userProgress', userId);

  try {
    await updateDoc(userDocRef, {
      completedCourses: arrayRemove(courseTitle),
    });
    console.log(`🗑️ Removed '${courseTitle}' from completedCourses`);
  } catch (error) {
    console.error("❌ Error removing course progress:", error);
  }
};




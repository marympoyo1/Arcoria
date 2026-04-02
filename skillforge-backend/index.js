const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000; // Port initialization

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON requests

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-service-account.json"); // Path to your Firebase private key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Use the private key for Firebase Admin SDK
});

const db = admin.firestore(); // Firestore database reference

// Example route to store user information in Firestore
app.post("/storeUser", async (req, res) => {
  const { uid, email } = req.body; // Extract user data from the request body

  try {
    // Store user info in the Firestore "users" collection with their UID as the document ID
    await db.collection("users").doc(uid).set({
      email, // User's email
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Timestamp when the user is stored
    });
    res.status(200).send("User stored in Firestore!"); // Success response
  } catch (error) {
    console.error("Error storing user:", error);
    res.status(500).send("Failed to store user."); // Error response
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


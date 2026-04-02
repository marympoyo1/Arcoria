const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = 5000;

// Set up Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from SkillForge Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/storeUser', async (req, res) => {
    try {
      const { uid, email } = req.body;
      const db = admin.firestore();
      const userRef = db.collection('users').doc(uid);
  
      await userRef.set({
        email: email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      res.status(200).send('User saved to Firestore!');
    } catch (error) {
      res.status(500).send('Error saving user to Firestore: ' + error.message);
    }
  });
  

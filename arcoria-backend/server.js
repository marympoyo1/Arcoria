const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = 5000;

const createVideo = (id, title, channel) => ({
  id,
  title,
  channel,
  embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
  watchUrl: `https://www.youtube.com/watch?v=${id}`,
});

const learningPaths = [
  {
    id: 'fullstack-development',
    categoryId: 'development',
    categoryName: 'Development',
    title: 'Fullstack Development',
    level: 'Beginner to Intermediate',
    description:
      'Build a practical fullstack foundation by moving from the web basics into JavaScript, React, APIs, and backend fundamentals.',
    outcome:
      'By the end of this path, learners should feel comfortable building and connecting simple frontend and backend projects.',
    lessons: [
      {
        id: 'html-css-foundations',
        title: 'HTML & CSS Foundations',
        description:
          'Learn how webpages are structured, styled, and laid out so you can build clean, responsive user interfaces.',
        duration: '2-3 hours',
        projectIdea:
          'Build a responsive personal landing page with a hero section, feature cards, and a clean mobile layout.',
        videos: [
          createVideo('a_iQb1lnAEQ', 'Learn HTML & CSS – Full Course for Beginners', 'freeCodeCamp.org'),
        ],
      },
      {
        id: 'javascript-fundamentals',
        title: 'JavaScript Fundamentals',
        description:
          'Understand variables, functions, arrays, objects, and core logic so you can make your projects interactive.',
        duration: '3-4 hours',
        projectIdea:
          'Create a small habit tracker or calculator that updates the UI based on user input and button clicks.',
        videos: [
          createVideo('PkZNo7MFNFg', 'Learn JavaScript - Full Course for Beginners', 'freeCodeCamp.org'),
        ],
      },
      {
        id: 'react-basics',
        title: 'React Basics',
        description:
          'Get comfortable with components, props, state, and building reusable UI in a modern frontend workflow.',
        duration: '2-3 hours',
        projectIdea:
          'Build a simple task manager with reusable components, local state, and a clean filtered list view.',
        videos: [
          createVideo('SqcY0GlETPk', 'React Tutorial for Beginners', 'Programming with Mosh'),
        ],
      },
      {
        id: 'apis-and-backend-basics',
        title: 'Intro to APIs and Backend Basics',
        description:
          'Learn how clients talk to servers, how APIs are structured, and how to build simple Express-powered backend routes.',
        duration: '2-3 hours',
        projectIdea:
          'Create a tiny API-powered app that fetches data and displays it in a clean frontend dashboard or list.',
        videos: [
          createVideo('WXsD0ZgxjRw', 'APIs for Beginners', 'freeCodeCamp.org'),
        ],
      },
    ],
  },
  {
    id: 'data-science',
    categoryId: 'data-analysis',
    categoryName: 'Data & Analysis',
    title: 'Data Science',
    level: 'Beginner to Intermediate',
    description:
      'Start with Python and data analysis basics, then build toward visualization, statistics, and practical machine learning foundations.',
    outcome:
      'This path helps learners build a strong base for data analysis projects, entry-level portfolios, and more advanced study.',
    lessons: [
      {
        id: 'python-for-data',
        title: 'Python for Data Work',
        description:
          'Learn Python syntax, data structures, and workflows that show up constantly in analytics and data science projects.',
        duration: '3-4 hours',
        projectIdea:
          'Write a Python script that cleans a small dataset and prints useful summary insights to the console.',
        videos: [
          createVideo('LHBE6Q9XlzI', 'Python for Beginners - Learn Python in 1 Hour', 'Programming with Mosh'),
        ],
      },
      {
        id: 'data-analysis-with-pandas',
        title: 'Data Analysis with Pandas',
        description:
          'Use Pandas to clean data, inspect trends, and prepare datasets for visualization or modeling.',
        duration: '2-3 hours',
        projectIdea:
          'Analyze a CSV file with Pandas and highlight a few trends you could present in a beginner portfolio.',
        videos: [
          createVideo('vmEHCJofslg', 'Pandas Tutorial', 'freeCodeCamp.org'),
        ],
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization Basics',
        description:
          'Present insights clearly with charts and dashboards that make trends easier to understand and explain.',
        duration: '1-2 hours',
        projectIdea:
          'Turn a small dataset into two or three polished charts that tell a clear story about the data.',
        videos: [
          createVideo('GpQoM_7M0UA', 'Matplotlib Tutorial for Beginners', 'Corey Schafer'),
        ],
      },
      {
        id: 'intro-to-machine-learning',
        title: 'Intro to Machine Learning',
        description:
          'Understand the basic ML workflow, how models are trained, and what makes a machine learning project successful.',
        duration: '2-3 hours',
        projectIdea:
          'Walk through a beginner machine learning example and explain the problem, dataset, and outcome in plain language.',
        videos: [
          createVideo('i_LwzRVP7bg', 'Machine Learning for Everybody', 'freeCodeCamp.org'),
        ],
      },
    ],
  },
  {
    id: 'ui-ux-design',
    categoryId: 'design',
    categoryName: 'Design',
    title: 'UI/UX Design',
    level: 'Beginner',
    description:
      'Learn how to think through user flows, wireframes, and interface design so you can create clearer digital experiences.',
    outcome:
      'Learners finish with a practical understanding of design thinking, UI patterns, and beginner-friendly Figma workflows.',
    lessons: [
      {
        id: 'design-thinking',
        title: 'Design Thinking',
        description:
          'Learn how to define user problems, explore ideas, and design with empathy and clarity.',
        duration: '1-2 hours',
        projectIdea:
          'Pick a simple app idea and outline the user problem, goals, and a short list of possible solutions.',
        videos: [
          createVideo('_r0VX-aU_T8', 'What is Design Thinking?', 'AJ&Smart'),
        ],
      },
      {
        id: 'wireframing-basics',
        title: 'Wireframing Basics',
        description:
          'Map out interfaces quickly so you can test structure and flow before worrying about polish.',
        duration: '1-2 hours',
        projectIdea:
          'Sketch a mobile app flow with low-fidelity wireframes for a sign-in screen, dashboard, and details page.',
        videos: [
          createVideo('qpH7-KFWZRI', 'Wireframing Tutorial', 'Flux Academy'),
        ],
      },
      {
        id: 'figma-basics',
        title: 'Figma Basics',
        description:
          'Build your first UI screens in Figma and learn the core tools used in modern product design workflows.',
        duration: '2-3 hours',
        projectIdea:
          'Design one polished app screen in Figma and turn your wireframe into a cleaner high-fidelity mockup.',
        videos: [
          createVideo('FTFaQWZBqQ8', 'Figma UI UX Design Tutorial', 'freeCodeCamp.org'),
        ],
      },
    ],
  },
];

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Arcoria Backend!');
});

app.get('/skills', (req, res) => {
  const skills = learningPaths.map((path) => ({
    id: path.id,
    categoryId: path.categoryId,
    categoryName: path.categoryName,
    title: path.title,
    level: path.level,
    description: path.description,
    lessonCount: path.lessons.length,
  }));

  res.json(skills);
});

app.get('/learning-paths/:id', (req, res) => {
  const learningPath = learningPaths.find((path) => path.id === req.params.id);

  if (!learningPath) {
    return res.status(404).json({ message: 'Learning path not found.' });
  }

  res.json(learningPath);
});

app.post('/storeUser', async (req, res) => {
  try {
    const { uid, email } = req.body;
    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);

    await userRef.set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send('User saved to Firestore!');
  } catch (error) {
    res.status(500).send('Error saving user to Firestore: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const { createThread, sendMessage } = require('./services/openaiService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static Angular files
app.use(express.static(path.join(__dirname, '../client/dist/about-me-chatbot')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to create a new thread
app.post('/api/assistants/thread', async (req, res) => {
  try {
    const threadId = await createThread();
    res.json({ threadId });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread.' });
  }
});

// Route to send a message and get the assistant's response
app.post('/api/assistants/message', async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: 'Thread ID and message are required.' });
  }

  try {
    const response = await sendMessage(threadId, message);
    res.json({ response });
  } catch (error) {
    console.error('Error getting assistant response:', error);
    res.status(500).json({ error: 'Failed to get assistant response.' });
  }
});

// Get Intro Message
app.get('/api/intro', (req, res) => {
  res.json({
    introMessage: process.env.INTRO_MESSAGE || 'Hi! I am an AI assistant. How can I help you today?',
  });
});

// Catch-all route to serve Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/about-me-chatbot/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { createThread, sendMessage } from './services/openaiService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static Angular files
app.use(express.static(path.join(__dirname, '../client/dist/client')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to create a new thread
app.post('/api/assistants/thread', async (req: Request, res: Response) => {
  try {
    const threadId = await createThread();
    res.json({ threadId });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread.' });
  }
});

// Route to send a message and get the assistant's response
app.post(
  '/api/assistants/message',
  (async (req: Request, res: Response) => {
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
  }) as express.RequestHandler);

// Catch-all route to serve Angular app
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
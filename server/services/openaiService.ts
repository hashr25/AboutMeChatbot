import { OpenAI } from 'openai';
import dotenv from 'dotenv';

console.log('Loading environment variables...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('dotenv.config()...', dotenv.config());
const apiKey = process.env.OPENAI_API_KEY ?? ""; // Load API key from environment variables
console.log("apiKey", apiKey);

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: apiKey, // Load API key from environment variables
});

/**
 * Creates a new thread and returns the thread ID.
 * @returns {Promise<string>} The ID of the created thread.
 */
/**
 * Creates a new thread and returns the thread ID.
 * @returns {Promise<string>} The ID of the created thread.
 */
export async function createThread(): Promise<string> {
  try {
    const response = await openai.beta.threads.create();

    const threadId = response.id; // Extract thread ID from the response
    console.log('Thread created with ID:', threadId);
    return threadId;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Failed to create thread.');
  }
}

/**
 * Sends a message to the assistant and gets the response.
 * @param threadId The ID of the thread.
 * @param message The message to send to the assistant.
 * @returns {Promise<string>} The assistant's response.
 */
export async function sendMessage(threadId: string, message: string): Promise<string> {
  try {
    // Send the message
    console.log('Sending message: ' + message);
    const messageResponse = await openai.beta.threads.messages.create(threadId,
      {
        role: 'user',
        content: message + " (Remember, do not answer anything that doesn't specifically pertain to Randy Hash)",
      },
    );

    console.log('Message sent:', messageResponse);

    // Run the assistant
    const assistant = await openai.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID || ''); // Load assistant ID from environment variables
    const runResponse = await openai.beta.threads.runs.stream(
      threadId,
      {
        assistant_id: assistant.id, // Replace with your assistant ID
      }).finalMessages();

    const messageContent: any = runResponse[0].content[0];

    // Extract and return the assistant's response
    const assistantResponse = messageContent?.text?.value;
    return assistantResponse;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to get assistant response.');
  }
}

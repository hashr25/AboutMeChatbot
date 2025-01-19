import { Component } from '@angular/core';
import { OpenAIService } from '../services/openai/openai.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, InputComponent, OutputComponent],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent {
  messages: { sender: 'user' | 'bot'; text: string }[] = [];
  threadId: string | null = null;
  loading: boolean = false; // Track if a response is being fetched

  constructor(private openaiService: OpenAIService) {
    this.openaiService.createThread().subscribe(
      (threadResponse) => {
        console.log('Thread initialized with ID:', threadResponse);
        this.threadId = threadResponse.threadId;

        this.fetchIntroductionMessage();
      },
      (error: any) => {
        console.error('Error initializing thread:', error);
      }
    );


  }

  handleUserMessage(userMessage: string): void {
    if (!userMessage.trim()) return;

    // Add user's message to the chat
    this.messages.push({ sender: 'user', text: userMessage });

    // Show the loading indicator
    console.log('Setting loading to true');
    this.loading = true;

    // Fetch bot response from OpenAI
    this.openaiService.sendMessage(this.threadId ?? '', userMessage).subscribe(
      (response: any) => {
        console.log('Bot response from backend:', response);

        const responseText = this.stripReferences(response.response);
        this.messages.push({ sender: 'bot', text: responseText });

        
        // Hide the loading indicator
        console.log('Setting loading to false');
        this.loading = false;

      },
      (error: any) => {
        console.error('Error:', error);
        this.messages.push({
          sender: 'bot',
          text: 'Sorry, there was an error. Please try again later.',
        });

        // Hide the loading indicator
        this.loading = false;
      }
    );
  }

  private fetchIntroductionMessage(): void {
    const introductionMessage = 'Hello! I am an AI assistant here to chat about Randy Hash. I can answer questions about his professional experience, projects, and more. Feel free to ask me anything!';
    
    // Simulate an AI-generated introductory message
    this.messages.push({ sender: 'bot', text: introductionMessage });

    // Hide the loader once the intro message is displayed
    this.loading = false;
  }

  private stripReferences(message: string): string {
    return message.replace(/【.*?】/g, ''); // Remove all patterns like 【...】
  }
}


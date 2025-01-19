import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TerminalComponent } from './terminal/terminal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'about-me-chatbot';
}

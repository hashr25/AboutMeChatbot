import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [FormsModule, CommonModule], // Import FormsModule for ngModel
})
export class InputComponent {
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.focusInput();
  }

  focusInput(): void {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }
  
  @Output() userMessage = new EventEmitter<string>();
  input: string = '';

  sendMessage() {
    if (this.input.trim()) {
      this.userMessage.emit(this.input);
      this.input = ''; // Clear input
    }
  }
}

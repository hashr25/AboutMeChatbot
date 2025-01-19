import {
  Component,
  Input,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class OutputComponent implements AfterViewChecked, OnChanges {
  @Input() messages: { sender: 'user' | 'bot'; text: string }[] = [];
  @ViewChild('outputContainer') outputContainer!: ElementRef;

  // Scroll to the bottom when the component is updated
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && !changes['messages'].isFirstChange()) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    if (this.outputContainer) {
      const container = this.outputContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}


import { Component, ChangeDetectionStrategy, input, signal, OnDestroy, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="whitespace-pre-wrap">{{ displayedText() }}</span><span class="cursor animate-blink text-[--accent]" [class.hidden]="isComplete()">|</span>
  `,
  styles: `
    .cursor {
      font-weight: normal;
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      from, to {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypewriterComponent implements OnDestroy {
  text = input.required<string>();
  speed = input<number>(75); // ms per character

  displayedText = signal('');
  isComplete = signal(false);
  private intervalId: any;
  private currentIndex = 0;

  constructor() {
    effect(() => {
      // This effect will run whenever the input `text` signal changes,
      // and also on initialization.
      this.text(); // Establish dependency on the input signal
      untracked(() => this.restart()); // Restart the animation
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTyping(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    const textToType = this.text();
    if (!textToType || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      this.displayedText.set(textToType);this.isComplete.set(true);return;
    }

    this.intervalId = setInterval(() => {
      if (this.currentIndex < textToType.length) {
        this.displayedText.update(val => val + textToType[this.currentIndex]);
        this.currentIndex++;
      } else {
        this.isComplete.set(true);
        clearInterval(this.intervalId);
      }
    }, this.speed());
  }
  
  private restart(): void {
    this.currentIndex = 0;
    this.displayedText.set('');
    this.isComplete.set(false);
    this.startTyping();
  }
}
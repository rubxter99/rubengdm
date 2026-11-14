
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="toggleLanguage()" 
      class="z-50 p-2 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 bg-gray-200/70 dark:bg-[#252526]/70 hover:bg-gray-300/80 dark:hover:bg-gray-700/80 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#1E1E1E] focus:ring-zinc-500 dark:focus:ring-gray-300 font-mono-vt text-sm"
      aria-label="Toggle language"
    >
      {{ languageService.language() === 'es' ? 'EN' : 'ES' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageToggleComponent {
  languageService = inject(LanguageService);

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}

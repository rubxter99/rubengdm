import { content } from '../../portfolio.content';

import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';

interface SocialLink {
  name: string;
  url: string;
  path: string;
  viewBox?: string;
}

interface ProjectLink {
  name: string;
  url: string;
}
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TypewriterComponent, CommonModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  languageService = inject(LanguageService);

  serviceCopy = computed(() => content[this.languageService.language()]);

  contactButtonText = computed(() => this.languageService.translations().contact.button);

  socialLinks = signal<SocialLink[]>([
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ruben-garcia-diazmaroto/',
      path: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z',
      viewBox: '0 0 24 24'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/rubxter99',
      path: 'M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
      viewBox: '0 0 24 24'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rubxtersito/',
      path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.75 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6z',
      viewBox: '0 0 24 24'
    }
  ]);

  projectLinks = signal<ProjectLink[]>([
    { name: 'Cyclops Games', url: 'https://cyclops-games.com/' },
    { name: 'SKROLL on Steam', url: 'https://store.steampowered.com/app/4224290/SKROLL/' },
    { name: 'Cyclops Games Instagram', url: 'https://www.instagram.com/cyclops.games/' },
    { name: 'Cyclops Games Discord', url: 'https://discord.gg/dNWkDsjeg' },
  ]);
}

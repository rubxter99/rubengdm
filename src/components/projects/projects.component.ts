
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TypewriterComponent],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  languageService = inject(LanguageService);

  title = computed(() => this.languageService.translations().videogames.title);

  videogames = computed(() => [
    {
      title: 'RANDOMIA',
      description: this.languageService.translations().videogames.randomia,
      imageUrl: 'images/randomia.png',
      projectUrl: 'https://rubengdm.itch.io/randomia'
    },
    {
      title: 'Deep Dark Waters',
      description: this.languageService.translations().videogames.deepDarkWaters,
      imageUrl: 'images/deep-dark-waters.png',
      projectUrl: 'https://rubengdm.itch.io/deepdarkwaters'
    }
  ]);
}
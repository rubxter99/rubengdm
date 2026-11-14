
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';

interface Job {
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  technologies: string[];
  functions: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TypewriterComponent, CommonModule],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  languageService = inject(LanguageService);

  title = computed(() => this.languageService.translations().experience.title);
  technologiesLabel = computed(() => this.languageService.translations().experience.technologies);
  functionsLabel = computed(() => this.languageService.translations().experience.functions);

  jobs = computed<Job[]>(() => {
    const t = this.languageService.translations().experience.jobs;
    return [t.niji, t.abacus, t.agama, t.tecoen];
  });
}
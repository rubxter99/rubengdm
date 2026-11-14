
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';

interface SkillCategory {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TypewriterComponent, CommonModule],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  languageService = inject(LanguageService);

  skillCategories = computed<SkillCategory[]>(() => {
    const t = this.languageService.translations().skills;
    const c = t.categories;
    const s = t.skillsList;
    return [
      { name: c.languages, skills: s.languages },
      { name: c.backend, skills: s.backend },
      { name: c.frontend, skills: s.frontend },
      { name: c.multiplatform, skills: s.multiplatform },
      { name: c.tools, skills: s.tools },
      { name: c.cloud, skills: s.cloud },
      { name: c.os, skills: s.os },
      { name: c.methodologies, skills: s.methodologies },
      { name: c.other, skills: s.other }
    ];
  });
}

import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TypewriterComponent, CommonModule],
  templateUrl: './education.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  languageService = inject(LanguageService);

  educationHistory = computed<EducationEntry[]>(() => {
    const t = this.languageService.translations().education;
    return [
      {
        degree: t.degree1,
        institution: t.institution1,
        period: t.period1,
        location: t.location1
      },
      {
        degree: t.degree2,
        institution: t.institution2,
        period: t.period2,
        location: t.location2
      },
      {
        degree: t.degree3,
        institution: t.institution3,
        period: t.period3,
        location: t.location3
      },
      {
        degree: t.degree4,
        institution: t.institution4,
        period: t.period4,
        location: t.location4
      }
    ];
  });
}
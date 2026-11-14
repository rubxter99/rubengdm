
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TypewriterComponent, NgOptimizedImage, CommonModule],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  languageService = inject(LanguageService);
  
  name = computed(() => this.languageService.translations().about.name);
  profileImageUrl = signal('images/ruben-garcia.png');
  
  title = computed(() => this.languageService.translations().about.title);
  private description = computed(() => this.languageService.translations().about.description);
  descriptionParagraphs = computed(() => this.description().split('\n').filter(p => p.trim() !== ''));
}
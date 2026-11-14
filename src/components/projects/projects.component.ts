
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

interface CreativeWork {
  title: string;
  category: string;
  imageUrl: string;
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

  creativeWork = computed<CreativeWork[]>(() => {
    const isSpanish = this.languageService.language() === 'es';

    return [
      {
        title: isSpanish ? 'Estudios de manos' : 'Hand studies',
        category: isSpanish ? 'Ilustracion digital' : 'Digital illustration',
        imageUrl: 'images/creative-work/hand-studies.jpg',
      },
      {
        title: isSpanish ? 'Escena de videojuego' : 'Game scene',
        category: isSpanish ? 'Arte y diseno de videojuego' : 'Game art and design',
        imageUrl: 'images/creative-work/ice-cave-game.png',
      },
      {
        title: isSpanish ? 'Sala arcade' : 'Arcade room',
        category: isSpanish ? 'Modelado y visualizacion 3D' : '3D modelling and visualization',
        imageUrl: 'images/creative-work/arcade-environment.png',
      },
      {
        title: isSpanish ? 'Entorno de videojuego' : 'Game environment',
        category: isSpanish ? 'Modelado y arte 3D' : '3D modelling and art',
        imageUrl: 'images/creative-work/game-environment.jpg',
      },
    ];
  });
}

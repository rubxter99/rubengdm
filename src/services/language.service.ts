
import { Injectable, signal, PLATFORM_ID, inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Language = 'es' | 'en';

const translations = {
  es: {
    windowTitles: {
      about: 'Sobre Mí',
      experience: 'Experiencia Laboral',
      skills: 'Habilidades Técnicas',
      videogames: 'Videojuegos',
      education: 'Educación',
      contact: 'Contacto',
    },
    dock: {
      about: 'Sobre Mí',
      experience: 'Experiencia',
      skills: 'Habilidades',
      videogames: 'Videojuegos',
      education: 'Educación',
      contact: 'Contacto',
    },
    about: {
      name: 'Rubén García Díaz-Maroto',
      title: 'Software Developer | Full Stack Web',
      description: "Desarrollador Full Stack con experiencia en aplicaciones web y backend con Angular, TypeScript, Node.js, PHP y Laravel. Trabajo con APIs REST, refactorización, actualización de versiones y bases de datos.\nActualmente trabajo en remoto en Niji, una consultora francesa, utilizando también Docker, GitLab CI/CD, Jira y Confluence.\nCurso el Grado en Ingeniería Informática en la UNED. Fuera del trabajo, desarrollo videojuegos y proyectos interactivos con Unity y C#, y participo en SKROLL junto al equipo de Cyclops Games.",
    },
    experience: {
      title: 'EXPERIENCIA LABORAL',
      technologies: 'TECNOLOGÍAS',
      functions: 'FUNCIONES',
      jobs: {
        niji: {"role":"Desarrollador Full Stack","company":"Niji","period":"MARZO 2026 - ACTUALIDAD","type":"Contrato indefinido · Remoto","location":"Madrid, España","technologies":["Angular","TypeScript","Node.js","PHP","Laravel","Docker","GitLab CI/CD","APIs REST","Postman","Jira","Confluence"],"functions":["Desarrollo y mantenimiento de aplicaciones con Angular, Node.js, TypeScript, PHP y Laravel.","Actualización progresiva de Angular y Node.js y adaptación de dependencias y código legacy.","Refactorización de PHP/Laravel y desarrollo y validación de APIs REST.","Gestión de entornos Docker, pipelines GitLab y documentación técnica."]},
        abacus: {
          role: 'Desarrollador Full Stack',
          company: 'Abacus Consulting',
          period: 'ENERO 2025 - FEBRERO 2025',
          type: 'Contrato temporal/proyecto',
          location: '[Madrid. España] [Abacus Consulting, B2B, B2C]',
          technologies: ['Laravel', 'Angular', 'TypeScript', 'Tailwind CSS', 'PHP', 'JavaScript', 'Postman', 'JSON', 'HTML', 'CSS'],
          functions: [
            'Integración de Laravel (backend) con Angular (frontend) para aplicaciones web optimizadas.',
            'Desarrollo y prueba de APIs REST con Postman y JSON.',
            'Colaboración en equipo para implementar nuevas funcionalidades y mantener el código.'
          ]
        },
        agama: {
          role: 'Desarrollador Full Stack / Entornos Virtuales 3D',
          company: 'Ágama',
          period: 'MARZO 2024 - MARZO 2025',
          type: 'Prácticas + colaboración freelance',
          location: '[Madrid. España] [Consultoría, B2C]',
          technologies: ['C#', 'Unity', 'Blender', 'Microsoft Mesh', 'PHP', 'HTML', 'CSS', 'WordPress'],
          functions: [
            'Creación de entornos virtuales 3D interactivos para proyectos tipo metaverso.',
            'Desarrollo web y mantenimiento de sitios WordPress personalizados.',
            'Implementación de herramientas 3D con Unity (C#) y colaboración en diseño visual.',
            'Trabajo en equipo para adaptar y optimizar soluciones para distintos clientes.'
          ]
        },
        tecoen: {
          role: 'Desarrollador Full Stack',
          company: 'Tecoen',
          period: 'OCTUBRE 2020 - OCTUBRE 2022',
          type: '',
          location: '[Madrid. España] [Technology, Communications & Energy Solutions, B2B, B2C]',
          technologies: ['PHP', 'Laravel', 'Angular', 'JavaScript', 'Java (Android Studio)', 'HTML', 'CSS', 'MySQL'],
          functions: [
            'Desarrollo de aplicaciones web y móviles con Laravel, Angular y Android Studio (Java).',
            'Implementación de mejoras en UX/UI para optimizar la experiencia del usuario.',
            'Colaboración directa con clientes para analizar requisitos y proponer soluciones.',
            'Uso de metodologías ágiles y coordinación de pequeñas tareas en equipo.'
          ]
        }
      }
    },
    education: {
      degree1: 'Grado en Ingeniería Informática',
      institution1: 'UNED (Universidad Nacional de Educación a Distancia)',
      period1: 'OCTUBRE 2025 - ACTUALIDAD',
      location1: 'Madrid. España',
      degree2: 'Técnico Superior en Animación 2D, 3D, Juegos y Entornos Interactivos',
      institution2: 'ESIC',
      period2: 'SEPTIEMBRE 2022 - JUNIO 2024',
      location2: 'Madrid. España',
      degree3: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      institution3: 'C.F.P. Juan XXIII',
      period3: 'SEPTIEMBRE 2021 - JUNIO 2022',
      location3: 'Madrid. España',
      degree4: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
      institution4: 'C.F.P. Juan XXIII',
      period4: 'SEPTIEMBRE 2018 - JUNIO 2021',
      location4: 'Madrid. España'
    },
    skills: {
      categories: {
        languages: 'Lenguajes',
        backend: 'Backend y bases de datos',
        frontend: 'Frontend & UI',
        multiplatform: 'Multiplataforma',
        tools: 'Herramientas',
        cloud: 'Cloud',
        os: 'Sistemas Operativos y Virtualización',
        methodologies: 'Metodologías y prácticas',
        other: 'Otros'
      },
      skillsList: {
        languages: ['Java', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'Python', 'HTML5', 'CSS3', 'C# (Unity)'],
        backend: ['Node.js', 'Laravel', 'APIs REST', 'MySQL', 'MongoDB', 'Spring Boot (nociones)', 'Hibernate (nociones)'],
        frontend: ['Angular', 'Tailwind CSS', 'Bootstrap', 'JSON', 'Diseño responsive'],
        multiplatform: ['Android Studio (Java)', 'Unity 3D (C#)', 'React Native (nociones)', 'Flutter (nociones)'],
        tools: ['Git', 'GitHub', 'Docker', 'GitLab CI/CD', 'Jira', 'Confluence', 'VS Code', 'Visual Studio', 'Android Studio', 'Unity', 'Postman'],
        cloud: ['Firebase (Auth/DB/Hosting)', 'Google Cloud Platform (nociones)'],
        os: ['Windows', 'Linux', 'Ubuntu', 'VMware Workstation', 'VirtualBox'],
        methodologies: ['Agile/Scrum', 'OOP', 'Testing básico', 'Integración continua (nociones)'],
        other: ['Licencia de conducir B', 'coche propio']
      }
    },
    videogames: {
      title: 'Videojuegos',
      randomia: 'Un pequeño juego en el que encarnas a TIK, un personaje tan ajeno como tú al mundo que le rodea.',
      deepDarkWaters: 'Asume el papel de Frank, un nuevo trabajador de TALASA, una compañía petrolera que busca nuevas vetas en las profundidades.',
    },
    contact: {
      button: 'CONTACTO'
    }
  },
  en: {
    windowTitles: {
      about: 'About Me',
      experience: 'Work Experience',
      skills: 'Technical Skills',
      videogames: 'Videogames',
      education: 'Education',
      contact: 'Contact',
    },
    dock: {
      about: 'About Me',
      experience: 'Experience',
      skills: 'Skills',
      videogames: 'Videogames',
      education: 'Education',
      contact: 'Contact',
    },
    about: {
      name: 'Ruben Garcia Diaz-Maroto',
      title: 'Software Developer | Full Stack Web',
      description: "Full Stack Developer with experience in web and backend applications using Angular, TypeScript, Node.js, PHP and Laravel. I work with REST APIs, refactoring, version upgrades and databases.\nI currently work remotely at Niji, a French consultancy, also using Docker, GitLab CI/CD, Jira and Confluence.\nI am studying Computer Engineering at UNED. Outside work, I develop video games and interactive projects with Unity and C#, and contribute to SKROLL alongside the Cyclops Games team.",
    },
    experience: {
      title: 'WORK EXPERIENCE',
      technologies: 'TECHNOLOGIES',
      functions: 'FUNCTIONS',
      jobs: {
        niji: {"role":"Full Stack Developer","company":"Niji","period":"MARCH 2026 - PRESENT","type":"Permanent contract · Remote","location":"Madrid, Spain","technologies":["Angular","TypeScript","Node.js","PHP","Laravel","Docker","GitLab CI/CD","REST APIs","Postman","Jira","Confluence"],"functions":["Developing and maintaining applications with Angular, Node.js, TypeScript, PHP and Laravel.","Upgrading Angular and Node.js and adapting dependencies and legacy code.","Refactoring PHP/Laravel code and developing and testing REST APIs.","Managing Docker environments, GitLab pipelines and technical documentation."]},
        abacus: {
          role: 'Full Stack Developer',
          company: 'Abacus Consulting',
          period: 'JANUARY 2025 - FEBRUARY 2025',
          type: 'Short-term contract/project',
          location: '[Madrid. Spain] [Abacus Consulting, B2B, B2C]',
          technologies: ['Laravel', 'Angular', 'TypeScript', 'Tailwind CSS', 'PHP', 'JavaScript', 'Postman', 'JSON', 'HTML', 'CSS'],
          functions: [
            'Integrated Laravel (backend) with Angular (frontend) for optimized web applications.',
            'Developed and tested REST APIs using Postman and JSON.',
            'Collaborated with the development team to implement new features and maintain the codebase.'
          ]
        },
        agama: {
          role: 'Full Stack Developer / 3D Virtual Environments',
          company: 'Agama',
          period: 'MARCH 2024 - MARCH 2025',
          type: 'Internship + freelance collaboration',
          location: '[Madrid. Spain] [Consulting, B2C]',
          technologies: ['C#', 'Unity', 'Blender', 'Microsoft Mesh', 'PHP', 'HTML', 'CSS', 'WordPress'],
          functions: [
            'Created interactive 3D virtual environments for metaverse-based projects.',
            'Developed and maintained WordPress websites, customizing layouts and features.',
            'Implemented 3D tools in Unity (C#) and collaborated on visual design.',
            'Worked in a small team to adapt and optimize client solutions.'
          ]
        },
        tecoen: {
          role: 'Full Stack Developer',
          company: 'Tecoen',
          period: 'OCTOBER 2020 - OCTOBER 2022',
          type: '',
          location: '[Madrid. Spain] [Technology, Communications & Energy Solutions, B2B, B2C]',
          technologies: ['PHP', 'Laravel', 'Angular', 'JavaScript', 'Java (Android Studio)', 'HTML', 'CSS', 'MySQL'],
          functions: [
            'Developed web and mobile applications using Laravel, Angular, and Android Studio (Java).',
            'Improved UX/UI design for better user experience.',
            'Communicated directly with clients to understand requirements and deliver solutions.',
            'Applied Agile methodologies and coordinated small development tasks within the team.'
          ]
        }
      }
    },
    education: {
      degree1: "Bachelor's Degree in Computer Engineering",
      institution1: 'UNED (National Distance Education University)',
      period1: 'OCTOBER 2025 - PRESENT',
      location1: 'Madrid. Spain',
      degree2: 'Higher Technician in 2D & 3D Animation, Games, and Interactive Environments',
      institution2: 'ESIC',
      period2: 'SEPTEMBER 2022 - JUNE 2024',
      location2: 'Madrid. Spain',
      degree3: 'Higher Technician in Web Application Development',
      institution3: 'C.F.P. Juan XXIII',
      period3: 'SEPTEMBER 2021 - JUNE 2022',
      location3: 'Madrid. Spain',
      degree4: 'Higher Technician in Multiplatform Application Development',
      institution4: 'C.F.P. Juan XXIII',
      period4: 'SEPTEMBER 2018 - JUNE 2021',
      location4: 'Madrid. Spain'
    },
    skills: {
      categories: {
        languages: 'Languages',
        backend: 'Backend & Databases',
        frontend: 'Frontend & UI',
        multiplatform: 'Cross-Platform',
        tools: 'Tools',
        cloud: 'Cloud',
        os: 'Operating Systems & Virtualization',
        methodologies: 'Methodologies & Practices',
        other: 'Other'
      },
      skillsList: {
        languages: ['Java', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'Python', 'HTML5', 'CSS3', 'C# (Unity)'],
        backend: ['Node.js', 'Laravel', 'REST APIs', 'MySQL', 'MongoDB', 'Spring Boot (basics)', 'Hibernate (basics)'],
        frontend: ['Angular', 'Tailwind CSS', 'Bootstrap', 'JSON', 'Responsive design'],
        multiplatform: ['Android Studio (Java)', 'Unity 3D (C#)', 'React Native (basics)', 'Flutter (basics)'],
        tools: ['Git', 'GitHub', 'Docker', 'GitLab CI/CD', 'Jira', 'Confluence', 'VS Code', 'Visual Studio', 'Android Studio', 'Unity', 'Postman'],
        cloud: ['Firebase (Auth/DB/Hosting)', 'Google Cloud Platform (basics)'],
        os: ['Windows', 'Linux', 'Ubuntu', 'VMware Workstation', 'VirtualBox'],
        methodologies: ['Agile/Scrum', 'OOP', 'Basic Testing', 'Continuous Integration (basics)'],
        other: ["Driver's license B", 'Own car']
      }
    },
    videogames: {
      title: 'Videogames',
      randomia: 'A little game where you play as TIK, a character as oblivious as you are about the world surrounding them.',
      deepDarkWaters: 'Take the role of Frank, a new worker from TALASA, an oil company looking for new veins in the depths.',
    },
    contact: {
      button: 'CONTACT'
    }
  }
};


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  
  private _language = signal<Language>('es');
  public readonly language = this._language.asReadonly();

  public readonly translations = computed(() => translations[this.language()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      let savedLang: string | null = null;
      try { savedLang = localStorage.getItem('language'); } catch { /* Storage may be disabled. */ }
      const browserLang = navigator.language.split('-')[0] as Language;
      
      const initialLang: Language = savedLang === 'es' || savedLang === 'en' ? savedLang : (browserLang === 'en' ? 'en' : 'es');
      this._language.set(initialLang);
      this.applyLanguage(initialLang);
    }
  }

  private applyLanguage(lang: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.setItem('language', lang); } catch { /* Language switching still works in memory. */ }
      document.documentElement.lang = lang;
      const title = lang === 'es' ? 'Rubén García | Desarrollo web y backend · RUBXTER' : 'Rubén García | Web & backend development · RUBXTER';
      const description = lang === 'es' ? 'Rubén García, desarrollador Full Stack en Madrid. Angular, Node.js y Laravel. Webs, APIs y videojuegos con Cyclops Games.' : 'Rubén García, Full Stack developer in Madrid. Angular, Node.js and Laravel. Websites, APIs and video games with Cyclops Games.';
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
  }

  toggleLanguage(): void {
    this._language.update(current => {
      const newLang = current === 'es' ? 'en' : 'es';
      this.applyLanguage(newLang);
      return newLang;
    });
  }
}

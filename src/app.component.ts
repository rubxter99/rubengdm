import { Component, ChangeDetectionStrategy, inject, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DesktopService } from './services/desktop.service';
import { LanguageService } from './services/language.service';
import { DockComponent } from './components/dock/dock.component';
import { WindowComponent } from './components/window/window.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';

@Component({
 selector:'app-root',standalone:true,templateUrl:'./app.component.html',
 imports:[NgComponentOutlet,DockComponent,WindowComponent,ThemeToggleComponent,LanguageToggleComponent],
 changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
 readonly desktopService=inject(DesktopService);
 readonly language=inject(LanguageService);
 readonly windows=this.desktopService.windows;
 readonly isMobile=this.desktopService.isMobile;
 readonly componentMap:Record<string,Type<unknown>>={AboutComponent,SkillsComponent,ProjectsComponent,EducationComponent,ContactComponent,ExperienceComponent};
 getComponentType(name:string){return this.componentMap[name]??null;}
}

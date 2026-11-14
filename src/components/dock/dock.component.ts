
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopService } from '../../services/desktop.service';
import { LanguageService } from '../../services/language.service';

interface DockItem {
  id: string;
  label: string;
  iconPath: string;
}

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent {
  desktopService = inject(DesktopService);
  languageService = inject(LanguageService);
  windows = this.desktopService.windows;

  private baseDockItems = [
    { id: 'about', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'experience', iconPath: 'M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' },
    { id: 'skills', iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'videogames', iconPath: 'M19 6H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zM9 15H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' },
    { id: 'education', iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'contact', iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  dockItems = computed<DockItem[]>(() => {
    const labels = this.languageService.translations().dock;
    return this.baseDockItems.map(item => ({
      ...item,
      label: labels[item.id as keyof typeof labels] || item.id,
    }));
  });

  onDockItemClick(id: string): void {
    this.desktopService.toggleWindow(id);
    if(this.desktopService.isMobile()) setTimeout(()=>document.getElementById(id)?.scrollIntoView({block:'start'}),0);
  }

  isWindowOpen(id: string): boolean {
    return this.windows().find(w => w.id === id)?.isOpen ?? false;
  }
}
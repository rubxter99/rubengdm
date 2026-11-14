
import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  private _theme = signal<'light' | 'dark'>('light');
  public readonly theme = this._theme.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      let savedTheme: string | null = null;
      try { savedTheme = localStorage.getItem('theme'); } catch { /* Storage may be disabled. */ }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (prefersDark ? 'dark' : 'light');
      this._theme.set(initialTheme);
      this.applyTheme(initialTheme);
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try { localStorage.setItem('theme', theme); } catch { /* Theme switching still works in memory. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1e1e1e' : '#fff7ed');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    this._theme.update(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
      return newTheme;
    });
  }
}

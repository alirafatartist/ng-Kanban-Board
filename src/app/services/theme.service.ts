import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: boolean = false;
  change(e: boolean): void {
    this.isDarkMode = e;
  }
}

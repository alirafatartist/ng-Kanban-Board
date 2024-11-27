import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(true);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value; 
  }
  change(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    this.SaveThemeToLocalstrorage();
  }


  SaveThemeToLocalstrorage():void{
    localStorage.setItem("isDarkMode",JSON.stringify(this.isDarkMode))
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  
  isDarkMode: boolean = true;
  change(e: boolean): void {
    this.isDarkMode = e;
  }


  SaveThemeToLocalstrorage():void{
    localStorage.setItem("isDarkMode",JSON.stringify(this.isDarkMode))
  }
}

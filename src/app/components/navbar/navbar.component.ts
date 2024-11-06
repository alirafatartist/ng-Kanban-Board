import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logoSrc: string = 'assets/images/logo-dark.svg';

  _isDarkMode:boolean=inject(ThemeService).isDarkMode
ngOnInit(): void {
  if (this._isDarkMode) {
    this.logoSrc = 'assets/images/logo-light.svg';
  } else {
    this.logoSrc = 'assets/images/logo-dark.svg';
  }
}
}

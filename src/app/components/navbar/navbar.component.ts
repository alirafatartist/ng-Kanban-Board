import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ActiveIndexService } from '../../services/active-index.service';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData } from '../../interfaces/boardData';

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logoSrc: string = 'assets/images/logo-dark.svg';
  constructor(private activeIndexService :ActiveIndexService){}
  _boardData: IBoardData[] = inject(BoardDataService).boardData;
  _isDarkMode:boolean=inject(ThemeService).isDarkMode
  activeIndex:number = 0;
ngOnInit(): void {
  this.activeIndexService.activeIndex$.subscribe(index => {
    if(index) this.activeIndex = index;
  });
  
  if (this._isDarkMode) {
    this.logoSrc = 'assets/images/logo-light.svg';
  } else {
    this.logoSrc = 'assets/images/logo-dark.svg';
  }
}
}

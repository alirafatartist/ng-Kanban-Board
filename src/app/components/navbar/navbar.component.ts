import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ActiveIndexService } from '../../services/active-index.service';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData } from '../../interfaces/boardData';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  standalone:true,
  imports:[CommonModule, BoardModalComponent, TaskModalComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logoSrc: string = 'assets/images/logo-dark.svg';
  constructor(
    private activeIndexService :ActiveIndexService,
    private themeService: ThemeService
  ){}
  _boardData: IBoardData[] = inject(BoardDataService).boardData;
  _isDarkMode:boolean=inject(ThemeService).isDarkMode
  activeIndex:number = 0;
  modalBoardTitle: string = '';
  ngOnInit(): void {
    this.activeIndexService.activeIndex$.subscribe(index => {
      this.activeIndex = index;
    });

    this.themeService.isDarkMode$.subscribe((isDark) => {
      this._isDarkMode = isDark;
      if (this._isDarkMode) {
        console.log(this._isDarkMode);
        this.logoSrc = 'assets/images/logo-light.svg';
      } else {
        console.log(this._isDarkMode);
        this.logoSrc = 'assets/images/logo-dark.svg';
      }
    });

}
isBoardModalOpen: boolean = false;

openBoardModal(title:string) {
  this.modalBoardTitle = title;
  this.isBoardModalOpen = true;
  console.log("clicked");
}

closeBoardModal() {
  this.isBoardModalOpen = false;
}
sendBoard(){
return this._boardData[this.activeIndex];
}
isTaskModalOpen:boolean=false;
openTaskModal(){
  this.isTaskModalOpen=true;
}
closeTaskModal(){
  this.isTaskModalOpen=false;
}
}

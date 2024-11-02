import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData } from '../../interfaces/boardData';
import { CommonModule } from '@angular/common';
import { SidebarItemComponent } from './Components/sidebar-item/sidebar-item.component';

@Component({
  standalone:true,
  imports:[CommonModule,SidebarItemComponent],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss', // Fix this to `styleUrls` not `styleUrl`
})
export class SidebarComponent {
  isSidebarHide: boolean = false;
  _isDarkMode=inject(ThemeService)
    logoSrc: string = 'assets/images/logo-dark.svg';
  iconClass:string="fa-solid fa-moon"

  boardData:IBoardData[]=[];
  activeIndex: number = 0;
  @Output() navigateToBoard = new EventEmitter<IBoardData>();
  constructor(
    private _boardDataService: BoardDataService,
  ) {}

ngOnInit(): void {
  this.boardData=this._boardDataService.getBoardData();
  this._boardDataService.SaveBoardDataToLocalstrorage()
}
  @ViewChild('offcanvas') offcanvasElement!: ElementRef;
  showbtn(): void {
    if (
      this.offcanvasElement.nativeElement.classList[
        this.offcanvasElement.nativeElement.classList.length - 1
      ] === 'showing'
    ) {
      this.isSidebarHide = true;
    } else {
      this.isSidebarHide = false;
    }
  }
  checkAreaModel(): void {
    const ariaModal =
    this.offcanvasElement.nativeElement.getAttribute('aria-modal');
    if (ariaModal == 'true') {
      this.showbtn();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    // console.log(targetElement);
    if (targetElement.classList.contains('offcanvas-backdrop')) {
      this.checkAreaModel();
    }
  }

  toggleTheme() {
    this._isDarkMode.change(!this._isDarkMode.isDarkMode)
    if (this._isDarkMode.isDarkMode) {
      this.logoSrc = 'assets/images/logo-light.svg';
      this.iconClass="fa-solid fa-sun rotate"
    } else {
      this.logoSrc = 'assets/images/logo-dark.svg';
      this.iconClass="fa-solid fa-moon rotate"
    }
  }
  setActiveIndex(index: number): void {
    this.activeIndex = index;// Marks the first element as active
  }

  isActive(index: number): boolean {
    return index === this.activeIndex; // Check if the current index is the active one
  }
  openBoard(boardItem: IBoardData): void {
    this.navigateToBoard.emit(boardItem); // Emit board data to parent
    this.isSidebarHide = true; // Close the sidebar
  }
}

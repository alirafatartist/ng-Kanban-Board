import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData } from '../../interfaces/boardData';
import { CommonModule } from '@angular/common';
import { SidebarItemComponent } from './Components/sidebar-item/sidebar-item.component';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { ActiveIndexService } from '../../services/active-index.service';

@Component({
  standalone:true,
  imports:[CommonModule,SidebarItemComponent,BoardModalComponent],
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
  activeIndex: number =0;
  @Output() navigateToBoard = new EventEmitter<IBoardData>();
  constructor(
    private _boardDataService: BoardDataService,
    private _themeService: ThemeService,
    private activeIndexService: ActiveIndexService,
  ) {}

ngOnInit(): void {
  this.boardData=this._boardDataService.getBoardData();
  this._boardDataService.SaveBoardDataToLocalstrorage();
  this._isDarkMode.SaveThemeToLocalstrorage()
  this.activeIndexService.activeIndex$.subscribe((index) => {
    this.activeIndex = index;
  });
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
    this._isDarkMode.SaveThemeToLocalstrorage()
    if (this._isDarkMode.isDarkMode) {
      this.logoSrc = 'assets/images/logo-light.svg';
      this.iconClass="fa-solid fa-sun rotate"
    } else {
      this.logoSrc = 'assets/images/logo-dark.svg';
      this.iconClass="fa-solid fa-moon rotate"
    }
  }
  setActiveIndex(index: number): void {
    this.activeIndexService.setActiveIndex(index);
    this.showbtn();
    document.body.removeAttribute('style');
  }
  isActive(index: number): boolean {
    return index === this.activeIndex; // Check if the current index is the active one
  }
  openBoard(boardItem: IBoardData): void {
    this.navigateToBoard.emit(boardItem); // Emit board data to parent
    this.isSidebarHide = true; // Close the sidebar
  }
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}

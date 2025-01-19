import { BoardDataService } from './../../services/board-data.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.scss'
})
export class DeleteBoardComponent {
  @Input() isBoardOpen:boolean=false;
  @Input() modalBoardTitle:String='';
  @Input() activeIndex!:number;

  @Output() close = new EventEmitter<void>();
  isDarkMode: boolean =inject(ThemeService).isDarkMode
    constructor(
private boardDataService:BoardDataService ,
      private themeService: ThemeService,
    ) { }
    ngOnInit(): void {
      this.themeService.isDarkMode$.subscribe((isDark) => {
        this.isDarkMode = isDark;
      });
    }
    closeModal() {
      this.isBoardOpen = false;
      this.close.emit();
    }
    deleteBoard(){
        this.boardDataService.deleteBoardData(this.activeIndex);
        this.activeIndex = -1;
        this.closeModal();
    }
}

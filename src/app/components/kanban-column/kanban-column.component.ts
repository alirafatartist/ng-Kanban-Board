import { BoardDataService } from './../../services/board-data.service';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
})
export class KanbanColumnComponent {
  _boardData: any = inject(BoardDataService);
  boardData = this._boardData;

  @Input() columnTitle!: string;
  log(): void {
    console.log(this.boardData);
  }
}

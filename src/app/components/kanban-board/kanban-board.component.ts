import { Component, inject } from '@angular/core';
import { BoardDataService } from '../../services/board-data.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {
  _boardData: any = inject(BoardDataService);
  boardData = this._boardData;
}

import { Component, inject } from '@angular/core';
import { TaskCardComponent } from './Components/task-card/task-card.component';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData } from '../../interfaces/boardData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [CommonModule,TaskCardComponent],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.scss'
})
export class ProjectBoardComponent {
  columnColors: string[] = [];
  _boardData:IBoardData[]=inject(BoardDataService).boardData

  getRandomHexColor():string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  ngOnInit(): void {
    if (this._boardData.length > 0) {
      this.columnColors = this._boardData[0].columns.map(() => this.getRandomHexColor());
    }
  }

   // Track by column name
   trackByColumn(index: number, column: { name: string }) {
    return column.name;
  }

  // Track by task title
  trackByTask(index: number, task: { title: string }) {
    return task.title;
  }
}

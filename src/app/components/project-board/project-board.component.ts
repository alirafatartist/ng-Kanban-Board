import { Component, inject } from '@angular/core';
import { TaskCardComponent } from './Components/task-card/task-card.component';
import { BoardDataService } from '../../services/board-data.service';
import { IBoardData, ISubTask, ITask } from '../../interfaces/boardData';
import { CommonModule } from '@angular/common';
import { SubtasksModalComponent } from './Components/subtasks-modal/subtasks-modal.component';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { ThemeService } from '../../services/theme.service';
import { ActiveIndexService } from '../../services/active-index.service';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    SubtasksModalComponent,
    BoardModalComponent,
  ],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.scss',
})
export class ProjectBoardComponent {
  columnColors: string[] = [];
  _boardData: IBoardData[] = inject(BoardDataService).boardData;
  isDarkMode = inject(ThemeService).isDarkMode;
  subTasks: ISubTask[] = [];
  activeIndex: number = 0;
  modalTitle: string = '';
  constructor(private activeIndexService :ActiveIndexService){}
  getRandomHexColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }
  ngOnInit(): void {
    this.activeIndexService.activeIndex$.subscribe(index => {
      if(index) this.activeIndex = index;
    });
    if (this._boardData.length > 0) {
      this.columnColors = this._boardData[this.activeIndex].columns.map(() =>
        this.getRandomHexColor()
      );
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

  saveSubtasks(subtasks: ISubTask[], tasktitle: string) {
    this.subTasks = subtasks;
    this.subTasks.map((x) => (x.mainTaskTitle = tasktitle));
    console.log(this.subTasks);
  }
  currentTask: ITask | undefined;
  onDragStart(task: ITask) {
    console.log('onDragStart');
    this.currentTask = task;
  }
  onDrop(event: any, status: string) {
    event.preventDefault();
    console.log('onDrop');

    if (!this.currentTask) {
      return;
    }
    const sourceColumn = this._boardData[this.activeIndex].columns.find((column) =>
      column.tasks.includes(this.currentTask!)
    );

    const targetColumn = this._boardData[this.activeIndex].columns.find(
      (column) => column.name === status
    );
    if (sourceColumn && targetColumn && sourceColumn !== targetColumn) {
      sourceColumn.tasks = sourceColumn.tasks.filter(
        (task) => task !== this.currentTask
      );
      targetColumn.tasks.push(this.currentTask);
      this.currentTask.status = status;
    }

    this.currentTask = undefined;
  }
  onDragOver(event: any) {
    console.log('onDragOver');
    event.preventDefault();
    //cusrsor to drag
  }
  isModalOpen: boolean = false;

  openModal(title:string) {
    this.modalTitle = title;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  sendBoard(){
return this._boardData[this.activeIndex];
  }
}

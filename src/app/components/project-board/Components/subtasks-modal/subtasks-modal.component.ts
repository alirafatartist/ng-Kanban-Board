import { Component, inject, Input } from '@angular/core';
import { ICloumn, ISubTask, ITask } from '../../../../interfaces/boardData';
import { ThemeService } from '../../../../services/theme.service';
import { BoardModalComponent } from "../../../board-modal/board-modal.component";
import { DeleteBoardComponent } from "../../../delete-board/delete-board.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subtasks-modal',
  standalone: true,
  imports: [CommonModule, BoardModalComponent, DeleteBoardComponent],
  templateUrl: './subtasks-modal.component.html',
  styleUrl: './subtasks-modal.component.scss'
})
export class SubtasksModalComponent {
  @Input() subTasks!: ISubTask[];
  @Input() columns !:ICloumn[];
    // logoSrc: string = 'assets/images/logo-dark.svg';
    constructor(
      private themeService: ThemeService
    ){}
    _isDarkMode:boolean=inject(ThemeService).isDarkMode
  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this._isDarkMode = isDark;
      // if (this._isDarkMode) {
      //   console.log(this._isDarkMode);
      //   this.logoSrc = 'assets/images/logo-light.svg';
      // } else {
      //   console.log(this._isDarkMode);
      //   this.logoSrc = 'assets/images/logo-dark.svg';
      // }
    });
  }


  sendTask():ITask|null {
    if (this.subTasks && this.subTasks.length > 0) {
      // Assuming you want to return a task with a list of subtasks
      return {
          title: 'Main Task Title',  // Example title, you can adjust as needed
          description: 'Main task description',  // Example description
          status: 'In Progress',  // Example status, you can adjust as needed
          subtasks: this.subTasks,  // Assuming subTasks is an array of ISubTask objects
      } as ITask;
  }
  return null;
  }
  isTaskModalOpen: boolean = false;
  modalTaskTitle: string = '';

  openTaskModal(title: string) {
    this.modalTaskTitle = title;
    this.isTaskModalOpen = true;
  }

  closeBoardModal() {
    this.isTaskModalOpen = false;
  }

  isDeleteModalOpen: boolean = false;

  deleteTaskModal(taskName: string, index: number = 0) {
    this.modalTaskTitle = taskName;
    this.isDeleteModalOpen = true;
  }

  closeDeleteTaskModal() {
    this.isDeleteModalOpen = false;
  }
}

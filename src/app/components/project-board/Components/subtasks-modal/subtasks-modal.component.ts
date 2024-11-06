import { Component, inject, Input } from '@angular/core';
import { ISubTask } from '../../../../interfaces/boardData';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-subtasks-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtasks-modal.component.html',
  styleUrl: './subtasks-modal.component.scss'
})
export class SubtasksModalComponent {
  @Input() subTasks!:ISubTask[];
  _isDarkMode:boolean=inject(ThemeService).isDarkMode

}

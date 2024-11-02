import { Component, Input } from '@angular/core';
import { ISubTask } from '../../../../interfaces/boardData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subtasks-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtasks-modal.component.html',
  styleUrl: './subtasks-modal.component.scss'
})
export class SubtasksModalComponent {
  @Input() subTasks!:ISubTask[]
}

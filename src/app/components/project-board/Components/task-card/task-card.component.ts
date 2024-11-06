import { Component, inject, Input } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() taskTitle!:string
@Input() taskSubtasksLength!:string

_isDarkMode:boolean=inject(ThemeService).isDarkMode

}

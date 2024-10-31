import { Component } from '@angular/core';
import { TaskCardComponent } from './Components/task-card/task-card.component';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.scss'
})
export class ProjectBoardComponent {

}

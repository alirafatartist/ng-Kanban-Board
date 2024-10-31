import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';

@Component({
  standalone:true,
  imports:[NavbarComponent,SidebarComponent,ProjectBoardComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}

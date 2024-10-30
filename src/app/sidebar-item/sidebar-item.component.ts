import { Component, Input } from '@angular/core';
import { IBoardData } from '../interfaces/boardData';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  @Input() boardName!: String;
  @Input() ngClass!: {[key: string]: boolean};

}

import { Component, Input } from '@angular/core';
import { IBoardData } from '../../../../interfaces/boardData';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  @Input() boardItem!:IBoardData;
  @Input() ngClass!: {[key: string]: boolean};

}

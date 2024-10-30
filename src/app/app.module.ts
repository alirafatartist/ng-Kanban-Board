import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanTaskComponent } from './components/kanban-task/kanban-task.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    KanbanBoardComponent,
    KanbanColumnComponent,
    KanbanTaskComponent,
    SidebarComponent,
    SidebarItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

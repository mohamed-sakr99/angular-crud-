import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../../material/material.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddTaskComponent,
    ListTasksComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    MaterialModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class TasksAdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
// import { TasksDetailsComponent } from './components/tasks-details/tasks-details.component';
import { MaterialModule } from 'projects/admin/src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListTasksComponent,
    // TasksDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TasksRoutingModule,
    NgxPaginationModule,
    SharedModule
  ],
})
export class TasksModule {}

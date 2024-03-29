import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksDetailsComponent } from './components/tasks-details/tasks-details.component';

const routes: Routes = [
    {
    path:'',
    component:ListTasksComponent
  },
  {
    path:':id',
    component:TasksDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

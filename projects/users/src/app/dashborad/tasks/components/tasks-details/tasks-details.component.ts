import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../service/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['./tasks-details.component.scss'],
})
export class TasksDetailsComponent {
  taskId: any;
  taskDetails: any;
  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private toaster: ToastrService,
    private router: Router,
  ) {
    this.route.paramMap.subscribe((res: any) => {
      this.taskId = res.params['id'];
    });
  }
  ngOnInit(): void {
    this.getTaskDetails();
  }
  getTaskDetails() {
    this.tasksService.taskDetails(this.taskId).subscribe((res: any) => {
      this.taskDetails = res.tasks;
    });
  }
  complete() {
    let Model = {
      id: this.taskId
    }
    this.tasksService.completeTask(Model).subscribe((res: any) => {
      this.router.navigate(['/tasks'])
      this.toaster.success('tasks completed successfully', 'success');

    });
  }
}

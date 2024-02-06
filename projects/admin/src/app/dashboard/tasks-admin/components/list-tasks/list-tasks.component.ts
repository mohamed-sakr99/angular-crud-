import { UsersService } from 'projects/admin/src/app/dashboard/services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLine: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];
  dataSource = [];
  timeOut: any;
  page: any = 1;
  total: any;
  filteration: any = {
    page: this.page,
    limit: 10,
  };
  users: any = [];

  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];
  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private usersService: UsersService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllTasks();
  }

  getUsers() {
    this.usersService.getUserData();
  }

  getDataFromSubject() {
    this.usersService.userData.subscribe((res: any) => {
      this.users = this.mapingUsersData(res.data);
    });
  }
  mapingUsersData(data: any[]) {
    let newArray = data?.map(item => {
      return {
        name: item?.username,
        id: item?._id,
      };
    });
    return newArray;
  }
  search(event: any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['keyword'] = event.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }
  selectUsers(event: any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['userId'] = event.value;
    this.getAllTasks();
  }
  selectStatus(event: any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['status'] = event.value;
    this.getAllTasks();
  }
  selectDate(event: any, type: string) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration[type] = event.value; //moment(event.value).format(DD-MM-YYYY)
    if (type == 'toDate' && this.filteration['toDate'] !== 'invalid date') {
      this.getAllTasks();
    }
  }
  getAllTasks() {
    this.tasksService.getAllTasks(this.filteration).subscribe((res: any) => {
      this.dataSource = this.mapingTasks(res.tasks);
      this.total = res.totalItems;
      console.log(res.totalItems);
    });
  }

  mapingTasks(data: any) {
    let newTasks = data.map((item: any) => {
      return {
        ...item,
        user: item?.userId?.username,
      };
    });
    return newTasks;
  }
  deleteTask(id: any) {
    this.tasksService.deleteTasks(id).subscribe((res) => {
      this.getAllTasks();
    });
  }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '650px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTasks();
      }
    });
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '650px',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllTasks();
      }
    });
  }
  changePage(event: any) {
    this.page = event;
    this.filteration['page'] = event;
    this.getAllTasks();
  }
}

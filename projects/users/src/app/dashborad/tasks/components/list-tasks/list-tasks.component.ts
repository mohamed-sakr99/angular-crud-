import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../service/tasks.service';
import { ToastrService } from 'ngx-toastr';

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
    'deadLineDate',
    'status',
    'actions',
  ];
  page: any;
  totalItems: any;
  selectedStatus: string = 'In-Progress';
  dataSource: any = [];
  tasksFilter!: FormGroup;
  userData: any;
  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];

  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getUserData();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllTasks() {
    let params = {
      page: this.page,
      limit: 10,
      status: this.selectedStatus,
    };
    this.tasksService.getUsersTasks(this.userData.userId, params).subscribe(
      (res: any) => {
        this.dataSource = res.tasks;
        this.totalItems = res.totalItems;
      },
      (error) => {
        this.dataSource = [];
      }
    );
  }
  complete(ele: any) {
    let Model = {
      id: ele._id,
    };
    this.tasksService.completeTask(Model).subscribe((res: any) => {
      this.getAllTasks();
      this.toaster.success('tasks completed successfully', 'success');
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllTasks();
  }

  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]));
    console.log('UsersData', this.userData);
  }
}

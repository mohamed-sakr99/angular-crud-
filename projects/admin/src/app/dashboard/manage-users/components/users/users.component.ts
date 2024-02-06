import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeStatus } from '../context/DTOs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  dataSource: any = [];
  page = 1;
  totalItems: any;
  constructor(
    private userService: UsersService,
    private toaster: ToastrService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const Model = {
      page: this.page,
      limit: 10,
      name: '',
    };
    this.userService.getUserData(Model)
  }

  getDataFromSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems = res.total;
    })
  }
  changePage(event: any) {
    this.page = event;
    this.getUsers();
  }

  deleteUser(id: string, index: number) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toaster.error('you cant Delete this user untill Finish tasks');
    } else {
      this.userService.deleteUser(id).subscribe((res: any) => {
        this.toaster.success('users deleted successfully', 'success');
        this.getUsers();
      });
    }
  }

  changeStatus(id: string, status: string, index: number) {
    const Model = {
      id,
      status,
    };
    if (this.dataSource[index].assignedTasks > 0) {
            this.toaster.error('you cant change status this user untill Finish tasks');

    } else {
      this.userService.changeStatus(Model).subscribe((res: any) => {
        this.toaster.success('users updated successfully', 'success');
        this.getUsers();
      });
    }
  }
}

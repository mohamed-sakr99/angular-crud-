import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeStatus } from '../manage-users/components/context/DTOs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURL: string = 'https://crud-0u9h.onrender.com/';
  userData = new BehaviorSubject({});
  constructor(private http: HttpClient) {}

  getAllUsers(filter: any) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        params = params.append(key, value);
      });
    }
    return this.http.get(this.apiURL + 'auth/users/', { params });
  }

  deleteUser(id: string) {
    return this.http.delete(this.apiURL + 'auth/user/' + id);
  }

  changeStatus(model: ChangeStatus) {
    return this.http.put(this.apiURL + 'auth/user-status/', model);
  }

  getUserData(model?: any) {
    this.getAllUsers(model).subscribe((res: any) => {
      this.userData.next({
        data: res.users,
        total: res.totalItems,
      });
    });
  }
}

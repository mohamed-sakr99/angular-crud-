import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  ApiUrl :string = "https://crud-0u9h.onrender.com/"
  constructor(private http: HttpClient) { }

  getUsersTasks(userId: string, TaskParams: any) {
    let params = new HttpParams();
    Object.entries(TaskParams).forEach(([key, value]:any) => {
      params = params.append(key, value)
    });
    return this.http.get(this.ApiUrl + 'tasks/user-tasks/' + userId, {params})
  }

  completeTask(model: object) {
    return this.http.put(this.ApiUrl + 'tasks/complete/' , model);
  }

  taskDetails(id:any) {
    return this.http.get(this.ApiUrl + 'tasks/task/'+ id)
  }
}

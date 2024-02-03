import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createTask } from '../tasks-admin/components/context/DTOS';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiURL: string ="https://crud-0u9h.onrender.com/"
  constructor(private http: HttpClient) { }

  getAllTasks(filter: any) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value)
      }
    })
    return this.http.get(this.apiURL + 'tasks/all-tasks' , {params})
  }

  createTask(model: any) {
    return this.http.post(this.apiURL +'tasks/add-task' , model)
  }
  updateTask(model: any, id:any) {
    return this.http.put(this.apiURL +'tasks/edit-task/' + id, model)
  }
  deleteTasks(id:any) {
    return this.http.delete(this.apiURL + 'tasks/delete-task/' + id)
  }
}

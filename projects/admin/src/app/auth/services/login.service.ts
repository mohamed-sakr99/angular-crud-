import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOS';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'https://crud-0u9h.onrender.com/';
  constructor(private http: HttpClient) { }

  login(model:Login) {
    return this.http.post(this.apiURL+ 'auth/login' ,model)
  }
}

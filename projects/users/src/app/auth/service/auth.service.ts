import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount, Login } from '../../dashborad/tasks/context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ApiUrl :string = "https://crud-0u9h.onrender.com/"
  constructor(private http: HttpClient) { }

  createUser(model:CreateAccount) {
    return this.http.post(this.ApiUrl + 'auth/createAccount', model)
  }
  login(model: Login) {
    return this.http.post(this.ApiUrl + 'auth/login' , model)
  }
}

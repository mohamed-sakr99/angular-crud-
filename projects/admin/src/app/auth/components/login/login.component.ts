import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toaster: ToastrService,
    private router: Router,
    ) {
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      role: ['admin']
    });
  }
  login() {
    this.loginService.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem("token" , res.token)
      this.toaster.success("success", "Login Successfully")
      this.router.navigate(['/tasks']);
    }, (err) => {
      this.toaster.error("error", "Access Denied", err);

    })
    console.log(this.loginForm.value);

  }
}



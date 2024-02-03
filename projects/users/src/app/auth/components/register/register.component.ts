import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CreateAccount } from '../../../dashborad/tasks/context/DTOs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
  }

  ngOnInit():void {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.fb.group({
      username : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
    },{validators: this.checkPassword})
  }
  createAccount() {
    const MODEL: CreateAccount = {
      username : this.registerForm.value['username'],
      email : this.registerForm.value['email'],
      password : this.registerForm.value['password'],
      confirmPassword: this.registerForm.value['confirmPassword'],
      role :'user'
    }
    this.authService.createUser(MODEL).subscribe((res) => {
      this.router.navigate(['/tasks'])

    })
  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return password ===confirmPass ? null : { notmatched : true}
  }
}

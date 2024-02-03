import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatrialModule } from '../matrial/matrial.module';
import { MaterialModule } from 'projects/admin/src/app/material/material.module';
import { SharedModule } from 'projects/admin/src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class AuthModule { }

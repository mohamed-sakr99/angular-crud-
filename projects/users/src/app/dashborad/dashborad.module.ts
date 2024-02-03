import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboradRoutingModule } from './dashborad-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DashboradRoutingModule,
    SharedModule
  ]
})
export class DashboradModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import(`./dashborad/dashborad.module`).then(m=>m.DashboradModule )
  },
  {
    path: "auth",
    loadChildren: ()=> import(`./auth/auth.module`).then(m=> m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

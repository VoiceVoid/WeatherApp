import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './parent/dashboard/dashboard.component';
import { ForecastComponent } from './parent/forecast/forecast.component';
import { UserInfoComponent } from './parent/user-info/user-info.component';
import { ParentComponent } from './parent/parent.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: '', component: ParentComponent,canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'forecast', component: ForecastComponent, canActivate: [AuthGuard] },
  {path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuard]  }
] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

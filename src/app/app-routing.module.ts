import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { CreateEmployeesComponent } from './Pages/employees/employees.component';
import { AuthGuard } from './Guards/auth.guard';
import { ActiveUserGuard } from './Guards/Login/active-user.guard';
import { NewsComponent } from './Pages/news/news.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ClientComponent } from './Pages/client/client.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'employees', component: CreateEmployeesComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'release', component: NewsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent,canActivate :[ActiveUserGuard]},
  { path: 'client', component: ClientComponent,canActivate :[AuthGuard]},
  { path: '', component: LoginComponent,canActivate :[ActiveUserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

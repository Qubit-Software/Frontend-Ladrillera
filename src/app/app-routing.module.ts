import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { CreateEmployeesComponent } from './Pages/employees/employees.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { ActiveUserGuard } from './Guards/Login/active-user.guard';
import { NewsComponent } from './Pages/news/news.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { DeliveryComponent } from './Pages/delivery/delivery.component';
import { AccountingComponent } from './Pages/accounting/accounting.component';
import { ChargeOrderComponent } from './Components/Orders/charge-order/charge-order.component';
import { CreateOrderComponent } from './Components/Orders/create-order/create-order.component';
import { SearchClientComponent } from './Components/Client/search-client/search-client.component';
import { SearchOrderComponent } from './Components/Orders/search-order/search-order.component';
import { RequestComponent } from './Components/accounting/request/request.component';
import { CreateClientComponent } from './Components/Client/create-client/create-client.component';
import { CreateNewReleaseComponent } from './Components/News/create-new-release/create-new-release.component';
import { FinanceComponent } from './Pages/finance/finance.component';
import { CronogramaComponent } from './Components/delivery/cronograma/cronograma.component';
import { PhotographyComponent } from './Components/delivery/photography/photography.component';
import { LodgeComponent } from './Pages/lodge/lodge.component';
import { ReportsComponent } from './Components/Orders/reports/reports.component';
import { BillingComponent } from './Pages/billing/billing.component';
import { CreateEmployeeComponent } from './Components/Employee/create-employee/create-employee.component';
import { SearchEmployeeComponent } from './Components/Employee/search-employee/search-employee.component';
import { ChargeEmployeeComponent } from './Components/Employee/charge-employee/charge-employee.component';
import { AllEmployeesComponent } from './Components/Employee/all-employees/all-employees.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', component: CreateEmployeesComponent, canActivate: [AuthGuard], children: [
      { path: 'create', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'employeesList', component: AllEmployeesComponent, canActivate: [AuthGuard] },
      { path: 'charge/:id', component: ChargeEmployeeComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], children: [
      { path: 'client', component: SearchClientComponent, canActivate: [AuthGuard] },
      { path: 'ording', component: CreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'search', component: SearchOrderComponent, canActivate: [AuthGuard] },
      { path: 'charge/:id', component: ChargeOrderComponent }
    ]
  },
  {
    path: 'accounting', component: AccountingComponent, canActivate: [AuthGuard], children: [
      { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
      { path: 'create', component: CreateClientComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'release', component: NewsComponent, canActivate: [AuthGuard], children: [
      { path: 'create', component: CreateNewReleaseComponent, canActivate: [AuthGuard] },
      { path: 'report', component: ReportsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'lodge', component: LodgeComponent, canActivate: [AuthGuard], children: [
      { path: 'search', component: SearchOrderComponent, canActivate: [AuthGuard] },
      { path: 'charge/:id', component: ChargeOrderComponent }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [ActiveUserGuard] },
  {
    path: 'finance', component: FinanceComponent, canActivate: [AuthGuard], children: [
      { path: 'search', component: SearchOrderComponent, canActivate: [AuthGuard] },
      { path: 'charge/:id', component: ChargeOrderComponent }
    ]
  },
  {
    path: 'billing', component: BillingComponent, canActivate: [AuthGuard], children: [
      { path: 'search', component: SearchOrderComponent, canActivate: [AuthGuard] },
      { path: 'charge/:id', component: ChargeOrderComponent }
    ]
  },
  {
    path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuard], children: [
      { path: 'cronogram', component: CronogramaComponent, canActivate: [AuthGuard] },
      { path: 'search', component: SearchOrderComponent, canActivate: [AuthGuard] },
      { path: 'photography/:id', component: PhotographyComponent }
    ]
  },
  { path: '', component: LoginComponent, canActivate: [ActiveUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

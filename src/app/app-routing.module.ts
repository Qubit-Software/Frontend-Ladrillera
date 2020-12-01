import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { CreateEmployeesComponent } from './Pages/employees/employees.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { ActiveUserGuard } from './Guards/Login/active-user.guard';
import { NewsComponent } from './Pages/news/news.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ClientComponent } from './Pages/client/client.component';
import { DeliveryComponent } from './Pages/delivery/delivery.component';
import { AccountingComponent } from './Pages/accounting/accounting.component';
import { ChargeOrderComponent } from './Components/Orders/charge-order/charge-order.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent,  },
  { path: 'employees', component: CreateEmployeesComponent,  },
  { path: 'orders', component: OrdersComponent,  },
  { path: 'accounting', component: AccountingComponent,  },
  { path: 'release', component: NewsComponent,  },
  { path: 'login', component: LoginComponent, canActivate: [ActiveUserGuard] },
  { path: 'client', component: ClientComponent,  },
  { path: 'delivery', component: DeliveryComponent,  },
  { path: '', component: LoginComponent, canActivate: [ActiveUserGuard] },
  { path: 'charge/:id', component: ChargeOrderComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { CreateEmployeesComponent } from './Pages/employees/employees.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { CreateEmployeeComponent } from './Components/create-employee/employee/create-employee.component';
import { NewsComponent } from './Pages/news/news.component';
import { CreateNewReleaseComponent } from './Components/News/create-new-release/create-new-release.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { CreateOrderComponent } from './Components/Orders/create-order/create-order.component';
import { SearchClientComponent } from './Components/Client/search-client/search-client.component';
import { ClientComponent } from './Pages/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateEmployeesComponent,
    NavBarComponent,
    CreateEmployeeComponent,
    NewsComponent,
    CreateNewReleaseComponent,
    OrdersComponent,
    CreateOrderComponent,
    SearchClientComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

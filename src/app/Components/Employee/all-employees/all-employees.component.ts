import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  employeeData:any;
  constructor(private employeeServ: AdminService) { }

  ngOnInit(): void {
    this.employeeData=new Array();
    this.getEmployees();
  }

  private getEmployees() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.employeeServ.getEmployees().subscribe((res) => {
      Swal.close();
      this.employeeData=res;
      for(let em of this.employeeData){
        console.log(em);
      }
    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener empleados',
        text: error
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../Services/Admin/admin.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  id: number;
  constructor(private router: Router, public admin: AdminService) { }

  ngOnInit(): void {
  }

  //Search employ
  public searchClient() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.admin.searchEmployee(this.id).subscribe(resp => {
      Swal.close();
      this.router.navigate(['/accounting/charge', this.id]);
    }, (err) => {
      console.log(err);
      Swal.close();
      Swal.fire({
        title: 'El empleado no existe',
        icon: 'error',
      });
    });
  }

}

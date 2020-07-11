import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();


  constructor( private admin: AdminService) { }

  ngOnInit(): void {
  }

}

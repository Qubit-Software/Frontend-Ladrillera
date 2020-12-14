import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rol: any;
  nombre: string = "...";
  tituloComunicado: string;
  descripcionComunicado: string;
  fecha: Date;
  constructor(private auth: AuthService, private admin: AdminService) {
    this.rol = localStorage.getItem('rol');
    this.nombre = localStorage.getItem('name');
  }

  ngOnInit(): void {
    this.admin.getComunicado().subscribe(res => {
      console.log(res);
      this.tituloComunicado = res['titulo'];
      this.descripcionComunicado = res['descripcion'];
      this.fecha = new Date(res['fecha']);
    });
  }

}

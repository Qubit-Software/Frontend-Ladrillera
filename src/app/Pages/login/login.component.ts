import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: "Revisa tus credenciales antes de acceder"
      });
      console.log(err)
    })
  }

}

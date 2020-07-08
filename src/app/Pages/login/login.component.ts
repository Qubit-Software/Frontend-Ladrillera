import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    console.log('se mando');
    console.log(this.usuario);
  }

}

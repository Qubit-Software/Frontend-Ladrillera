import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.auth.login(this.usuario).subscribe( resp =>{
      console.log(resp);
    },(err) =>{
      console.log(err)
    })
  }

}

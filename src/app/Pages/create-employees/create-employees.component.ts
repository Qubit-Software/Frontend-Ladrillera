import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {

  form: FormGroup;

  constructor(private admin: AdminService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void {
  }
  //Nombres validation
  get nombresNoValido() {
    return this.form.get("nombres").invalid && this.form.get('nombres').touched;
  }
  get nombresValido() {
    return this.form.get("nombres").valid && this.form.get('nombres').touched;
  }
  //Apellidos validation
  get apellidosNoValido() {
    return this.form.get("apellidos").invalid && this.form.get('apellidos').touched;
  }
  get apellidosValido() {
    return this.form.get("apellidos").valid && this.form.get('apellidos').touched;
  }
  //cedula_ciudadania validation
  get cedula_ciudadaniaNoValido() {
    return this.form.get("cedula_ciudadania").invalid && this.form.get('cedula_ciudadania').touched;
  }
  get cedula_ciudadaniaValido() {
    return this.form.get("cedula_ciudadania").valid && this.form.get('cedula_ciudadania').touched;
  }
  //genero validation
  get generoNoValido() {
    return this.form.get("genero").invalid && this.form.get('genero').touched;
  }
  get generoValido() {
    return this.form.get("genero").valid && this.form.get('genero').touched;
  }
  //fecha_nacimiento validation
  get fecha_nacimientoNoValido() {
    return this.form.get("fecha_nacimiento").invalid && this.form.get('fecha_nacimiento').touched;
  }
  get fecha_nacimientoValido() {
    return this.form.get("fecha_nacimiento").valid && this.form.get('fecha_nacimiento').touched;
  }
  //rol validation
  get rolNoValido() {
    return this.form.get("rol").invalid && this.form.get('rol').touched;
  }
  get rolValido() {
    return this.form.get("rol").valid && this.form.get('rol').touched;
  }
  //email validation
  get emailNoValido() {
    return this.form.get("email").invalid && this.form.get('email').touched;
  }
  get emailValido() {
    return this.form.get("email").valid && this.form.get('email').touched;
  }
  //password validation
  get passwordNoValido() {
    return this.form.get("password").invalid && this.form.get('password').touched;
  }
  get passwordValido() {
    return this.form.get("password").valid && this.form.get('password').touched;
  }
  //Validations ends

  createForm() {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(4)]],
      apellidos: ['', [Validators.required,]],
      cedula_ciudadania: ['', [Validators.required,]],
      genero: ['', [Validators.required,]],
      fecha_nacimiento: ['', [Validators.required,]],
      rol: ['', [Validators.required,]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,]]
    });
  }

  createEmployee() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach( control =>{control.markAsTouched()});
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });

      this.admin.createEmployee(this.form.get("nombres").value, this.form.get("nombres").value, this.form.get("nombres").value, this.form.get("nombres").value, this.form.get("nombres").value, this.form.get("nombres").value,this.form.get("nombres").value,this.form.get("nombres").value).subscribe(resp => {
        console.log(resp);
        Swal.close();
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: "Revisa tus credenciales antes de acceder"
        });
        console.log(err)
      });
    }
  }

}

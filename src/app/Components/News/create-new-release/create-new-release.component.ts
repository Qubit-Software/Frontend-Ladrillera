import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModulesService } from 'src/app/Services/Modulos/modules.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/Admin/admin.service';


@Component({
  selector: 'app-create-new-release',
  templateUrl: './create-new-release.component.html',
  styleUrls: ['./create-new-release.component.css']
})
export class CreateNewReleaseComponent implements OnInit {

  form: FormGroup;
  fileToUpload: File = null;

  constructor(private admin: AdminService, private moduleService: ModulesService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void { }
  //Nombres validation
  get invalidTitle() {
    return this.form.get("title").invalid && this.form.get('title').touched;

  }
  get validTitle() {
    return this.form.get("title").valid && this.form.get('title').touched;
  }
  //Apellidos validation
  get apellidosNoValido() {
    return this.form.get("paragraph").invalid && this.form.get('paragraph').touched;
  }
  get apellidosValido() {
    return this.form.get("paragraph").valid && this.form.get('paragraph').touched;
  }

  //Validations ends

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      paragraph: ['', [Validators.required,]]
    });
  }

  // Create Employee
  createRelease() {
    const date = new Date();
    const fecha = `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => { control.markAsTouched() });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();
      // name, lastname, cedula, gender, bornDate, rol,correo,contrasena, fileToUp: File
      this.admin.createComunicado(this.form.get('title').value, this.form.get('paragraph').value, fecha).subscribe(resp => {

        Swal.close();
        console.log(resp);
        Swal.fire('Comicado realizado',
          'El comunicado se ha registrado con exito',
          'success');
        //cleaning the form after a post
        this.form.reset();
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el comunicado',
          text: err.error.email
        });
        console.log(err);
      });
    }

  }
}

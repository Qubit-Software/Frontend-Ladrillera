import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { ModulesService } from 'src/app/Services/Modulos/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  form: FormGroup;
  fileToUpload: File = null;
  modulesName = [];
  modulesModel = [];
  constructor(private client: ClientService, private moduleService: ModulesService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void {

  }
  get nombresNoValido() {
    return this.form.get("nombres").invalid && this.form.get('nombres').touched;
  }
  get nombresValido() {
    return this.form.get("nombres").valid && this.form.get('nombres').touched;
  }
  // Apellidos validation
  get apellidosNoValido() {
    return this.form.get("apellidos").invalid && this.form.get('apellidos').touched;
  }
  get apellidosValido() {
    return this.form.get("apellidos").valid && this.form.get('apellidos').touched;
  }
  // cedula_ciudadania validation
  get cedula_ciudadaniaNoValido() {
    return this.form.get("cedula_ciudadania").invalid && this.form.get('cedula_ciudadania').touched;
  }
  get cedula_ciudadaniaValido() {
    return this.form.get("cedula_ciudadania").valid && this.form.get('cedula_ciudadania').touched;
  }
  // tipo validation
  get tipoNoValido() {
    return this.form.get("tipo").invalid && this.form.get('tipo').touched;
  }
  get tipoValido() {
    return this.form.get("tipo").valid && this.form.get('tipo').touched;
  }
  // city validation
  get cityNoValido() {
    return this.form.get("city").invalid && this.form.get('city').touched;
  }
  get cityValido() {
    return this.form.get("city").valid && this.form.get('city').touched;
  }
  // email validation
  get emailNoValido() {
    return this.form.get("email").invalid && this.form.get('email').touched;
  }
  get emailValido() {
    return this.form.get("email").valid && this.form.get('email').touched;
  }
  // foto validation
  get photoFiledNoValido() {
    return this.form.get("photoFile").invalid && this.form.get('photoFile').touched;
  }
  get photoFileValido() {
    return this.form.get("photoFile").valid && this.form.get('photoFile').touched;
  }

  // phone validation
  get phoneNoValido() {
    return this.form.get("phone").invalid && this.form.get('phone').touched;
  }
  get phoneValido() {
    return this.form.get("phone").valid && this.form.get('phone').touched;
  }
  // Validations ends


  createForm() {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(4)]],
      apellidos: ['', [Validators.required,]],
      cedula_ciudadania: ['', [Validators.required, Validators.minLength(4)]],
      tipo: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
      photoFile: ['', [Validators.required,]],
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  // Create Employee
  createEmployee() {
    const modulos = '';
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
      this.client.createClient('1', this.form.get("nombres").value, this.form.get("apellidos").value, this.form.get("cedula_ciudadania").value, this.form.get("tipo").value, this.form.get("city").value, this.form.get("email").value, this.form.get("phone").value).subscribe(resp => {
        Swal.close();
        Swal.fire('Registro realizado',
          'El cliente se ha registrado',
          'success');
        //cleaning the form after a post
        this.form.reset();
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el cliente',
          text: err
        });
        console.log(err);
      });
    }

  }
}

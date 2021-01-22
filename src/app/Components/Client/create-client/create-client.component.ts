import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
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

  imagesToUpload: any[] = [];
  form: FormGroup;
  modulesName = [];
  modulesModel = [];
  empleados = [];
  constructor(private client: ClientService, private empleadosServices: AdminService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void {
    this.empleados = new Array();
    this.getEmployees();
  }

  private getEmployees() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.empleadosServices.getEmployees().subscribe((res: []) => {
      Swal.close();
      for (let em of res) {
        if (em['rol'] === 'Ventas') {
          this.empleados.push(em);
        }
      }
      console.log(this.empleados);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener empleados',
        text: error
      });
    });
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
  // empleado validation
  get empleadoNoValido() {
    return this.form.get("empleado").invalid && this.form.get('empleado').touched;
  }
  get empleadoValido() {
    return this.form.get("empleado").valid && this.form.get('empleado').touched;
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
  // get photoFiledNoValido() {
  //   return this.form.get("photoFile").invalid && this.form.get('photoFile').touched;
  // }
  // get photoFileValido() {
  //   return this.form.get("photoFile").valid && this.form.get('photoFile').touched;
  // }

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
      empleado: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
      // photoFile: ['', [Validators.required]],
    });
  }

  // handleFileInput(file: FileList) {
  //   for (let i = 0; i < file.length; i++) {
  //     this.imagesToUpload.push(file.item(i));
  //   }
  // }

  public sendDocs() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => { control.markAsTouched() });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();
      this.client.createClient(this.form.get("empleado").value, this.form.get("nombres").value, this.form.get("apellidos").value, this.form.get("cedula_ciudadania").value, this.form.get("tipo").value, this.form.get("city").value, this.form.get("email").value, this.form.get("phone").value).toPromise().then(res => {
        Swal.close();
        Swal.fire({
          title: 'Registro realizado',
          icon: 'success',
          html: 'El usuario se ha registrado',
        })
      }, (err) => {
        Swal.close();
        console.log(err);
      });
      // console.log(this.imagesToUpload);
      // var peticiones: any[] = [];
      // for (let i = 0; i < this.imagesToUpload.length; i++) {
      //   var peticion = this.client.sendDocs(res['id'], this.imagesToUpload[i], this.form.get("tipo").value);
      //   peticiones.push(peticion);
      // }
      // forkJoin(peticiones).subscribe(() => {
      //   Swal.close();
      //   Swal.fire({
      //     title: 'Registro realizado',
      //     icon: 'success',
      //     html: 'El usuario se ha registrado',
      //   })
      // }, (err) => {
      //   Swal.close();
      //   console.log(err);
      // });
    }
  }
}

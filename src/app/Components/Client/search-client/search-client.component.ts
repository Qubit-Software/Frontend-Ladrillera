import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {

  form: FormGroup;
  id: number;
  constructor(private router: Router, private fb: FormBuilder, public clientServ: ClientService) { this.createForm(); }

  ngOnInit(): void {
  }

  // phone validation
  get nombreNoValido() {
    return this.form.get("nombre").invalid && this.form.get('nombre').touched;
  }
  get nombreValido() {
    return this.form.get("nombre").valid && this.form.get('nombre').touched;
  }
  // phone validation
  get phoneNoValido() {
    return this.form.get("phone").invalid && this.form.get('phone').touched;
  }
  get phoneValido() {
    return this.form.get("phone").valid && this.form.get('phone').touched;
  }

  // Creates a form
  public createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  //Search client
  public searchClient() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.clientServ.getClientByCCNIT(this.id).subscribe(resp => {
      Swal.close();
      const name = `${resp['nombre']} ${resp['apellido']}`;
      localStorage.setItem('id_client', resp['id']);
      localStorage.setItem('client', name);
      this.router.navigate(['/orders/ording']);
    }, (err) => {
      console.log(err);
      Swal.close();
      Swal.fire({
        title: 'El cliente no existe',
        icon: 'error',
        html:
          'Verifica los datos del cliente o realiza el proceso de creación si el usuario  es nuevo',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:
          '<btn (click)="test"> <i class="fa fa-thumbs-up"></i> Crear cliente <a/>',
        cancelButtonText:
          '<i class="fa fa-thumbs-down">Cancelar</i>',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $('#exampleModalCenter').modal('show');
        }
      });
    });
  }
  requestClient() {

  }
}

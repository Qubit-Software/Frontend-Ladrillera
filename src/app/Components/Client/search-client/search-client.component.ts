import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {

  form: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public searchClient() {
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
        this.router.navigate(['/orders']);
      }
    })
  }
  test() {
    alert('test');
  }
}

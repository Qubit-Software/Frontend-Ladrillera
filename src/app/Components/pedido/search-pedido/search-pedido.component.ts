import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-pedido',
  templateUrl: './search-pedido.component.html',
  styleUrls: ['./search-pedido.component.css']
})
export class SearchPedidoComponent implements OnInit {
  title = 'angular-sweetalert-demo';

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  prueba() {
    Swal.fire({
      title: 'El pedido no existe',
      icon: 'error',
      html:
        'Verifica los datos del codigo',
      showCloseButton: true,
    })
  }
  test() {

  }
}

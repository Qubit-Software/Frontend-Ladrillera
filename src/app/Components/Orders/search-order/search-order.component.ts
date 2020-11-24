import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {
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

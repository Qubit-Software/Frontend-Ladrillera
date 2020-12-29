import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';
import { product } from "../../../models/products.model";
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  minDate = moment(new Date()).format('YYYY-MM-DD');
  ladId: any;
  public totalSell = 0;
  public total = 0;
  public totalIva = 0;
  public product = new product();
  public dataArray = [];
  public measure = [];
  date: Date;
  atras = false;
  confirm = false;
  continuar = true;
  active = 0;
  nombreCliente: string;

  public products = [
    {
      "codigo": "LAD21-MATCO",
      "nombre": ["Bloquelon MATCO"],
      "medida": ["Unidad"]
    },
    {
      "codigo": "LAD21-MALLA",
      "nombre": ["Malla Electrosoldada"],
      "medida": [
        "Rollo/s",
        "Panel/es"
      ]
    },
    {
      "codigo": "LAD21-PERFIL",
      "nombre": ["Perfil Entrepiso"],
      "medida": ["Metro/s"]
    }
  ]

  constructor(private fb: FormBuilder, private CreateOrderService: CreateOrderService, private router: Router) {

  }


  ngOnInit(): void {
    this.product = new product();
    this.dataArray.push(this.product);
    this.nombreCliente = localStorage.getItem('client');
  }


  public generateOrder() {

    if (this.date != undefined || this.dataArray[0].cantidad != undefined) {
      this.date = new Date(this.date);
      const fechaCargue = `${this.date.getDate() + 1}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
      const num = String(this.totalSell);
      console.log(fechaCargue);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();
      this.CreateOrderService.createOrder(this.dataArray, fechaCargue, num).subscribe((result) => {
        this.dataArray = [];
        this.ladId = result['pedido'].id;
        Swal.close();
        Swal.fire({
          title: '',
          text: "El codigo del pedido es: Lad21-" + this.ladId,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/home');
          }
        })
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la pedido',
        });
        console.log(err);
        this.dataArray = [];
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Revisa los campos aun hacen falta datos',
      });
    }

  }


  public addForm() {
    this.product = new product();
    this.product.iva = 0;
    this.dataArray.push(this.product);
    console.log(this.dataArray)
  }
  public deleteProduct(element) {
    this.dataArray.splice(element);
    this.onChange();
  }
  verificar(): void {
    this.continuar = false;
    this.confirm = true;
    this.atras = true;
    this.active = 1;
  }
  Atras(): void {
    this.continuar = true;
    this.confirm = false;
    this.atras = false;
    this.active = 0;
  }
  public productCodeSet(element) {
    switch (this.dataArray[element].nombre) {
      case "Bloquelon MATCO":
        this.dataArray[element].codigo_producto = this.products[0].codigo;
        this.dataArray[element].medidas = this.products[0].medida;
        break;
      case "Malla Electrosoldada":
        this.dataArray[element].codigo_producto = this.products[1].codigo;
        this.dataArray[element].medidas = this.products[1].medida;
        break;
      case "Perfil Entrepiso":
        this.dataArray[element].codigo_producto = this.products[2].codigo;
        this.dataArray[element].medidas = this.products[2].medida;
        break;
      default:
        break;
    }
  }

  public onChange() {
    var test = 0;
    var iva = 0;
    this.totalSell = 0;
    this.totalIva = 0;
    this.total = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i].valor == null) {
        test += 0;
      } else {
        test += this.dataArray[i].valor;

      }
      if (this.dataArray[i].iva == null) {
        iva += 0;
      } else {
        iva += this.dataArray[i].iva;

      }
    }
    this.totalIva += iva;
    if (isNaN(this.totalIva)) {
      this.totalIva = 0;
    }
    this.totalSell += test;
    if (isNaN(this.totalSell)) {
      this.totalSell = 0;
    }
    this.total = Number(this.totalSell + this.totalIva);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';
import { product } from "../../../models/products.model";
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  public totalSell = 0;
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
    // this.CreateOrderService.createOrder(date).subscribe((result) => {
    //   console.log(result);
    // });
  }


  public generateOrder() {
    this.date = new Date(this.date);
    const fechaCargue = `${this.date.getDate() + 1}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
    console.log(this.dataArray);
    const num = String(this.totalSell);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.CreateOrderService.createOrder(this.dataArray, fechaCargue, num).subscribe((result) => {
      console.log(result);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la pedido',
      });
      console.log(err);
    });
  }


  public addForm() {
    this.product = new product();
    this.dataArray.push(this.product);
  }
  public deleteProduct(element) {
    this.dataArray.splice(element);
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
    this.totalSell = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      test += this.dataArray[i].valor;
    }
    this.totalSell += test;
    if (isNaN(this.totalSell)) {
      this.totalSell = 0;
    }
  }
}

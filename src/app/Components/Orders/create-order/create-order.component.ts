import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
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
  public measure = []

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

  constructor(private fb: FormBuilder, private CreateOrderService: CreateOrderService) {

  }

  ngOnInit(): void {
    this.product = new product();
    this.dataArray.push(this.product);
    this.CreateOrderService.createOrder().subscribe((result)=>{
      console.log(result);
    });
  }


  public generateOrder() {
    console.log(this.dataArray);
  }


  public addForm() {
    this.product = new product();
    this.dataArray.push(this.product);
  }
  public deleteProduct(element) {
    this.dataArray.splice(element);
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

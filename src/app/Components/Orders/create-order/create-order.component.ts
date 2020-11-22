import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  form: FormGroup;
  public totalSell = 0;
  public products = [
    {
      "codigo": "LAD21-MATCO",
      "nombre": "Bloquelon MATCO",
      "medida": ["Unidad"]
    },
    {
      "codigo": "LAD21-MALLA",
      "nombre": "Malla Electrosoldada",
      "medida": [
        "Rollo/s",
        "Panel/es"
      ]
    },
    {
      "codigo": "LAD21-PERFIL",
      "nombre": "Perfil Entrepiso",
      "medida": ["Metro/s"]
    }
  ]

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  public onsum(value) {
    console.log(value);
    this.totalSell - Number(value);
    this.totalSell += Number(value);
  }

  public generateOrder() {

  }

  createForm() {
    this.form = this.fb.group({
    });
  }

}

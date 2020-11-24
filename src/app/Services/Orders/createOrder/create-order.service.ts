import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  private url = 'https://94771c6b93ee.ngrok.io/api/ventas/pedidos';
  productos:any[] = [   {
      "codigo_producto": "LAD21-MATCO",
      "cantidad": 1,
      "unidad_medicion": "121"
    },
    {
      "codigo_producto": "LAD21-MALLA",
      "cantidad": 1,
      "unidad_medicion": "121"
    }
  ]

  constructor(private http: HttpClient, private auth: AuthService) { }

  public createOrder() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    const fd = new FormData();
    fd.append('id_cliente', '1');
    fd.append('fecha_cargue', "23/11/2020");
    fd.append('total', '541561');
    fd.append('productos', JSON.stringify(this.productos));
    return this.http.post(`${this.url}`, fd,opts);

  }
}

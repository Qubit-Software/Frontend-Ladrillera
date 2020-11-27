import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

<<<<<<< HEAD
  private url = 'http://02450ae931d8.ngrok.io/api/ventas/pedidos';
=======
  private url = 'https://4e70b73a919f.ngrok.io/api/ventas/pedidos';
>>>>>>> 273adf4cd74a7e3b58e103bac78f0246c732c716
  productos: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  public createOrder(productos: any[], fecha: string, total: string) {
    productos.forEach(p => {
      const products = {
        'codigo_producto': p.codigo_producto,
        "cantidad": p.cantidad,
        "unidad_medicion": p.unidad_medicion,
        "valor_total": p.valor
      };
      this.productos.push(products);
    });
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    const body = {
      'id_cliente': '1',
      'fecha_cargue': fecha,
      'total': total,
      'productos': this.productos
    };
    console.log(body);
    return this.http.post(`${this.url}`, body, opts);
  }
  public getPedidos() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}`, opts);
  }

  public getPedidoId(id: number) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/${id}`, opts);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  private url = 'https://e57779089ae4.ngrok.io/api/ventas/pedidos';
  productos: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  public sendPics(idPedido, fileToUpload) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    const fd = new FormData();
    fd.append('id_pedido', idPedido);
    fd.append('foto', fileToUpload);
    return this.http.post(
      `https://e57779089ae4.ngrok.io/api/empleados/despachos/fotografias`,
      fd,
      opts
    ).pipe(
      map(resp => {
        console.log(resp);
      })
    );
  }

  public createOrder(productos: any[], fecha: string, total: string) {
    productos.forEach(p => {
      const products = {
        'codigo_producto': p.codigo_producto,
        "cantidad": p.cantidad,
        "unidad_medicion": p.unidad_medicion,
        "valor_total": p.valor,
        "iva": p.iva,
        "comentarios": p.comentarios
      };
      this.productos.push(products);
    });
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    const body = {
      'id_cliente': localStorage.getItem('id_client'),
      'fecha_cargue': fecha,
      'total': total,
      'productos': this.productos
    };
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

  public changeStatus(idPedido, status) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    const body = {
      'id_pedido': idPedido,
      'estatus': status
    };
    console.log(body);
    return this.http.put(`${this.url}/${idPedido}`, body, opts);
  }
  public cronogramItems() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/tipo/cronograma`, opts);
  }

}

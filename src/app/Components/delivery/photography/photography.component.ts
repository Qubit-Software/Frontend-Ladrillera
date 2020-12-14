import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {


  atras = false;
  confirm = false;
  continuar = true;
  active: boolean = false;
  continueEnable: boolean = false;
  clientName: any;
  fechaCargue: any;
  product: any;
  public pedidos: PedidoModel;
  idOrder: number;
  private sub: any;
  images: any = [];
  allImages: any = [];
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
  ];

  constructor(private CreateOrderService: CreateOrderService, private route: ActivatedRoute, private clientServ: ClientService) {
    this.idOrder = parseInt(this.route.snapshot.paramMap.get("id").slice(1, 99));
  }

  ngOnInit(): void {
    this.CreateOrderService.changeStatus(this.idOrder, 3).subscribe((result) => {
      console.log(result);
      this.mainConfig();
    });
  }

  public mainConfig() {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.pedidos = new PedidoModel();
    this.CreateOrderService.getPedidoId(Number(this.idOrder)).subscribe((result: any[]) => {
      Swal.close();
      this.product = result['productos'];
      this.product = result['productos'];
      this.pedidos.id = result['id'];
      this.pedidos.idCliente = result['id_cliente'];
      this.pedidos.fechaCargue = result['fecha_cargue'];
      this.pedidos.total = result['total'];
      this.pedidos.producto = [['']];
      this.pedidos.status = result['estatus']
      this.pedidos.producto = result['productos'];
      this.pedidos.producto.forEach(p => {
        const produc = this.products.find(prod => prod.codigo === p.codigo_producto);
        p.nombre = produc.nombre;
      });
      this.clientName = result['cliente'].nombre + " " + result['cliente'].apellido;
      this.fechaCargue = result['fecha_cargue'];
      console.log(this.clientName);
    });
  }

  public fileUpload(event) {
    var files = event.target.files;
    console.log(files);
    if (files) {

      for (let i = 0; i < files.length; i++) {
        const image = {
          name: '',
          url: '',
        };
        this.allImages.push(files[i]);
        image.name = files[i].name;
        image.url = files[i].url;
        const reader = new FileReader();
        reader.onload = (filedata) => {
          image.url = reader.result + '';
          this.images.push(image);
          this.imagesRequired();
        };
        reader.readAsDataURL(files[i]);
      }

    }
    event.srcElement.value = null;
  }

  public save() {

  }
  public deleteImage(image: any) {
    const index = this.images.indexOf(image);
    this.images.splice(index, 1);
    this.allImages.splice(index, 1);
    this.imagesRequired();
  }

  private imagesRequired() {
    //verify if there is more than 4 images to enable continuar button
    if (this.images.length >= 4) {
      this.continueEnable = true;
    } else {
      this.continueEnable = false;
    }
  }

  verificar(): void {
    this.continuar = false;
    this.confirm = true;
    this.atras = true;
    this.active = true;
  }
  Atras(): void {
    this.continuar = true;
    this.confirm = false;
    this.atras = false;
    this.active = false;
  }

  //descarga un pdf
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      scrollX: 0,
      scrollY: 0
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'JPEG', 15, 15, pdfWidth, pdfHeight, "a", "FAST");
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
}
export class PedidoModel {
  id: number;
  idCliente: number;
  fechaCargue: string;
  status: string;
  total: string;
  producto: any;

}

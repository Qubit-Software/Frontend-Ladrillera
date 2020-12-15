import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import { CreateOrderService } from 'src/app/Services/Orders/createOrder/create-order.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { forkJoin } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    return false;
    //I have used return false but you can your other functions or any query or condition
  }
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value;
  today;
  hour;

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
  images: any = [];
  imagesToUpload: any[] = [];
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

  constructor(private CreateOrderService: CreateOrderService, private route: ActivatedRoute, private clientServ: ClientService, private router: Router, private sendPicturesServ: CreateOrderService) {
    this.idOrder = parseInt(this.route.snapshot.paramMap.get("id").slice(1, 99));
    this.value = window.location.href.slice(0, -24) + "lodge/charge/" + this.idOrder;
    this.getActualDate();
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    this.CreateOrderService.changeStatus(this.idOrder, 3).subscribe((result) => {
      this.mainConfig();
    });
  }

  public mainConfig() {
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
    });
  }

  public fileUpload(event, file: FileList) {
    for (let i = 0; i < file.length; i++) {
      this.imagesToUpload.push(file.item(i));
    }
    var files = event.target.files;
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
      docResult.save(`${new Date().toISOString()}_Lad21.pdf`);
    });
    $("#exampleModal").modal('hide');
    this.router.navigateByUrl("/home");
  }

  public getActualDate() {
    this.today = new Date().toLocaleDateString();
    var test = new Date();
    var ampm = test.getHours() >= 12 ? 'pm' : 'am';
    this.hour = test.getHours() % 12 + ":" + test.getMinutes() + " " + ampm
  }
  public sendPics() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    var pasa: Boolean;
    var peticiones: any[] = [];

    for (let i = 0; i < this.imagesToUpload.length; i++) {
      var peticion = this.CreateOrderService.sendPics(this.idOrder, this.imagesToUpload[i]);
      peticiones.push(peticion);
    }
    peticiones.push(this.CreateOrderService.changeStatus(this.idOrder, 1))
    forkJoin(peticiones).subscribe(() => {
      Swal.close();
      Swal.fire({
        allowOutsideClick: false,
        showCloseButton: false,
        allowEscapeKey: false,
        title: 'Registro realizado',
        icon: 'success',
        html: 'Las imagenes se han registrado',
        confirmButtonText:
          '<btn (click)="test"> <i class="fa fa-thumbs-up"></i> Generar ticket <a/>',
      }).then((result) => {
        if (result.isConfirmed) {
          $("#exampleModal").modal('show');
        }
      });
    }, (err) => {
      Swal.close();
      console.log(err);
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

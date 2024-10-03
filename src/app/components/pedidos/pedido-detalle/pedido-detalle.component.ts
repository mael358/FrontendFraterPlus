import { Component } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MONEDA_LABEL } from '../../../data/config';
import { DatePipe } from '@angular/common';
import { Cliente } from '../../../models/cliente';
import { ClientesService } from '../../../services/cliente.service';
import { FacturaService } from '../../../services/factura.service';
import { Factura } from '../../../models/factura';
import {v4 as uuidv4} from 'uuid';
import { DetalleFactura } from '../../../models/detalleFactura';
import { FacturaDTO } from '../../../models/dtos/facturaDTO';
import { DetalleFacturaDTO } from '../../../models/dtos/detalleFacturaDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './pedido-detalle.component.html'
})
export class PedidoDetalleComponent {
  
  pedido!: Pedido;
  cliente!: Cliente;
  factura: FacturaDTO = new FacturaDTO();
  titulo: string = 'Pedido';
  puedeFacturar: boolean = true;
  MONEDA_LABEL = MONEDA_LABEL;

  constructor(private pedidoService: PedidoService,
    private facturaService: FacturaService,
    private router: Router,
  private activatedRoute: ActivatedRoute,
  private clienteService: ClientesService) { }

  ngOnInit(): void {    
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.pedidoService.getPedido(id).subscribe(pedido => {
        console.log(pedido);
        this.pedido = pedido;
        this.pedido.detalles.forEach(detalle => {
          if(detalle.cantidadDisponible < detalle.cantidad){
            this.puedeFacturar = false;
        }});


        let clienteId = pedido.cliente_id;
        this.clienteService.getCliente(clienteId).subscribe(cliente => this.cliente = cliente)    
      })
    })
  }

  crearFactura(): void {
    console.log(this.pedido);
    this.factura.idCliente = this.cliente.id;
    //generate a new UUID for the factura
    let myuuid = uuidv4();
    this.factura.numero = uuidv4();
    this.factura.observacion = this.pedido.observaciones;
    this.factura.detalles = [];
    this.pedido.detalles.forEach(detalle => {
      let detalleFactura = new DetalleFacturaDTO();
      detalleFactura.articulo = detalle.articuloId;
      detalleFactura.cantidad = detalle.cantidad;
      detalleFactura.precio = detalle.precio;
      detalleFactura.linea = detalle.linea;
      this.factura.detalles.push(detalleFactura);
    });
    console.log(this.factura);
    
    this.facturaService.facturarPedido(this.factura).subscribe(factura => {
      Swal.fire('Factura creada', `La factura ha sido creada correctamente`, 'success');
      this.router.navigate(['/facturas', factura.id]);
    });
  }
}

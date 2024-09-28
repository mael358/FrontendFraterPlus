import { Component } from '@angular/core';
import { Compra } from '../../../models/compra';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { ComprasService } from '../../../services/compras.service';
import { DatePipe } from '@angular/common';
import { Proveedor } from '../../../models/proveedor';
import { MONEDA_LABEL } from '../../../data/config';

@Component({
  selector: 'app-compra-detalle',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './compra-detalle.component.html'
})
export class CompraDetalleComponent {
  titulo: string = 'Compra';
  compra!: Compra;
  proveedor!: Proveedor;
  
  MONEDA_LABEL = MONEDA_LABEL;

  constructor(private comprasService: ComprasService,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ProveedorService
  ){ }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.comprasService.getCompra(id).subscribe(compra => {
        this.compra = compra
        //TODO: Cambiar el proveedor por el proveedor real
        //let clienteId = +this.pedido.cliente;
        let proveedorId = 1;
        this.proveedorService.getProveedor(proveedorId).subscribe(proveedor => this.proveedor = proveedor)    
      })
    })
  }
}

import { Component } from '@angular/core';
import { Factura } from '../../../models/factura';
import { FacturaService } from '../../../services/factura.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClientesService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { MONEDA_LABEL } from '../../../data/config';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-factura-detalle',
  standalone: true,
  imports: [RouterModule, DatePipe, CommonModule],
  templateUrl: './factura-detalle.component.html'
})
export class FacturaDetalleComponent {
  titulo: string = 'Factura';
  factura!: Factura;
  cliente!: Cliente;
  
  MONEDA_LABEL = MONEDA_LABEL;

  constructor(private facturasService: FacturaService,
    private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.facturasService.getFactura(id).subscribe(factura => {
        this.factura = factura;
        this.cliente = this.factura.cliente_id;
      })
    })
  }
}

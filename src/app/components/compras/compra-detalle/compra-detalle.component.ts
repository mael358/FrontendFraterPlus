import { Component } from '@angular/core';
import { Compra } from '../../../models/compra';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { ComprasService } from '../../../services/compras.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Proveedor } from '../../../models/proveedor';
import { MONEDA_LABEL } from '../../../data/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-detalle',
  standalone: true,
  imports: [RouterModule, DatePipe, CommonModule],
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
    Swal.fire(this.titulo, `Compra creado con exito!`, 'success');

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.comprasService.getCompra(id).subscribe(compra => {
        this.compra = compra
        this.proveedor = this.compra.proveedor_id;
      })
    })
  }
}

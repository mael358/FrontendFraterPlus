import { Component } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MONEDA_LABEL } from '../../../data/config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './pedido-detalle.component.html'
})
export class PedidoDetalleComponent {
  
  pedido!: Pedido;
  titulo: string = 'Pedido';
  MONEDA_LABEL = MONEDA_LABEL;


  constructor(private pedidoService: PedidoService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +(params.get('id') || '0');
      this.pedidoService.getPedido(id).subscribe(pedido => {
        console.log(pedido);
        this.pedido = pedido
      })
    })
  }
}

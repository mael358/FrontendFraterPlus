import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Factura } from '../../models/factura';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { flatMap, map, Observable } from 'rxjs';
import { Articulo } from '../../models/articulo';
import { ClientesService } from '../../services/cliente.service';
import { FacturaService } from '../../services/factura.service';
import { ArticuloService } from '../../services/articulo.service';
import { DetallePedido } from '../../models/detallePedido';
import Swal from 'sweetalert2';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MONEDA_LABEL } from '../../data/config';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent {
  titulo: string = 'Nuevo pedido';
  pedido: Pedido = new Pedido();
  MONEDA_LABEL = MONEDA_LABEL;
  
  autoCompleteControl = new FormControl();
  productosFiltrados!: Observable<Articulo[]>;

  constructor(private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private articuloService: ArticuloService,
    private router: Router) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +(params.get('clienteId') || '0');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.pedido.cliente = cliente)
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Articulo[]> {
    const filterValue = value.toLowerCase();

    return this.articuloService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Articulo): string {
    return producto ? producto.nombre : '';
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Articulo;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      let nuevoItem = new DetallePedido();
      nuevoItem.articulo = producto;
      this.pedido.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.pedido.items = this.pedido.items.map((item: DetallePedido) => {
      if (id === item.articulo.id) {
        item.cantidad = cantidad;
      }
      return item;
    })
  }

  actualizarValorVenta(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    this.pedido.items = this.pedido.items.map((item: DetallePedido) => {
      if (id === item.articulo.id) {
        item.articulo.valorVenta = cantidad;
      }
      return item;
    })
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.pedido.items.forEach((item: DetallePedido) => {
      if (id === item.articulo.id) {
        existe = true;
      }
    })
    return existe;
  }

  incrementarCantidad(id: number): void {
    this.pedido.items = this.pedido.items.map((item: DetallePedido) => {
      if (id === item.articulo.id) {
        ++item.cantidad;
      }
      return item;
    })
  }

  eliminarItemFactura(id: number): void {
    this.pedido.items = this.pedido.items.filter((item: DetallePedido) => id !== item.articulo.id)
  }

  create(): void{
    console.log(this.pedido);
    console.log(this.pedidoService.urlEndPoint);
    this.pedidoService.create(this.pedido).subscribe(pedido => {
      Swal.fire(this.titulo, `Factura ${pedido.descripcion} creada con exito!`, 'success');
      this.router.navigate(['/pedidos', pedido.id]);
    });
  }

}

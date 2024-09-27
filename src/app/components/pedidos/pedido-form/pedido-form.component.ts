import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pedido } from '../../../models/pedido';
import { ESTADO_INICIAL_PEDIDO, MONEDA_LABEL } from '../../../data/config';
import { Articulo } from '../../../models/articulo';
import { map, mergeMap, Observable } from 'rxjs';
import { ClientesService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';
import { ArticuloService } from '../../../services/articulo.service';
import { DetallePedido } from '../../../models/detallePedido';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pedido-form.component.html'
})
export class PedidoFormComponent {

  titulo: string = 'Nuevo pedido';
  pedido: Pedido = new Pedido();
  cliente!: Cliente;
  MONEDA_LABEL = MONEDA_LABEL;
  
  autoCompleteControl = new FormControl();
  autoCompleteControlCliente = new FormControl();
  productosFiltrados!: Observable<Articulo[]>;
  clientesFiltrados!: Observable<Cliente[]>;

  constructor(private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    private articuloService: ArticuloService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +(params.get('clienteId') || '0');
      if (clienteId !== 0)
        this.clienteService.getCliente(clienteId).subscribe(cliente => this.cliente = cliente)
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      mergeMap(value => value ? this._filter(value) : [])
    );

    this.clientesFiltrados = this.autoCompleteControlCliente.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombres),
      mergeMap(value => value ? this._filterClientes(value) : [])
    );
  }

  private _filter(value: string): Observable<Articulo[]> {
    const filterValue = value.toLowerCase();
    console.log("Filtrando articulos: "+ filterValue);
    
    return this.articuloService.filtrarProductos(filterValue);
  }

  private _filterClientes(value: string): Observable<Cliente[]> {
    const filterValue = value.toLowerCase();

    return this.clienteService.filtrarClientes(filterValue);
  }

  mostrarNombreCliente(cliente?: Cliente): string {
    return cliente ? cliente.nombres : '';
  }

  mostrarNombre(producto?: Articulo): string {
    return producto ? producto.nombre : '';
  }

  seleccionarCliente(event: MatAutocompleteSelectedEvent): void {
    let cliente = event.option.value as Cliente;
    console.log(cliente);
    
    this.cliente = cliente;

    this.autoCompleteControlCliente.setValue('');
    event.option.focus();
    event.option.deselect();
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
    this.pedido.clienteObj = this.cliente;
    this.pedido.estadoId = ESTADO_INICIAL_PEDIDO;
    console.log(this.pedido);
    this.pedidoService.create(this.pedido).subscribe(pedido => {
      Swal.fire(this.titulo, `Pedido creado con exito!`, 'success');
      this.router.navigate(['/pedidos', pedido.id]);
    });
  }
}

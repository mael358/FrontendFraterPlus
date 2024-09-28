import { Component } from '@angular/core';
import { Compra } from '../../../models/compra';
import { Proveedor } from '../../../models/proveedor';
import { MONEDA_LABEL } from '../../../data/config';
import { ComprasService } from '../../../services/compras.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Articulo } from '../../../models/articulo';
import { map, mergeMap, Observable } from 'rxjs';
import { ArticuloService } from '../../../services/articulo.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { DetalleCompra } from '../../../models/detalleCompra';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule],
  templateUrl: './compra-form.component.html'
})
export class CompraFormComponent {
  titulo: string = 'Nuevo pedido';
  compra: Compra = new Compra();
  proveedor!: Proveedor;
  MONEDA_LABEL = MONEDA_LABEL;

  autoCompleteControl = new FormControl();
  autoCompleteControlCliente = new FormControl();
  productosFiltrados!: Observable<Articulo[]>;
  clientesFiltrados!: Observable<Proveedor[]>;

  constructor(private comprasService: ComprasService,
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private articuloService: ArticuloService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      mergeMap(value => value ? this._filter(value) : [])
    );

    this.clientesFiltrados = this.autoCompleteControlCliente.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombres),
      mergeMap(value => value ? this._filterProveedores(value) : [])
    );
  }

  private _filter(value: string): Observable<Articulo[]> {
    const filterValue = value.toLowerCase();
    console.log("Filtrando articulos: "+ filterValue);
    
    return this.articuloService.filtrarProductos(filterValue);
  }

  private _filterProveedores(value: string): Observable<Proveedor[]> {
    const filterValue = value.toLowerCase();

    return this.proveedorService.filtrarProveedores(filterValue);
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Articulo;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      let nuevoItem = new DetalleCompra();
      nuevoItem.articulo = producto;
      this.compra.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarProveedor(event: MatAutocompleteSelectedEvent): void {
    let proveedor = event.option.value as Proveedor;
    console.log(proveedor);
    
    this.proveedor = proveedor;

    this.autoCompleteControlCliente.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.compra.items.forEach((item: DetalleCompra) => {
      if (id === item.articulo.id) {
        existe = true;
      }
    })
    return existe;
  }

  incrementarCantidad(id: number): void {
    this.compra.items = this.compra.items.map((item: DetalleCompra) => {
      if (id === item.articulo.id) {
        ++item.cantidad;
      }
      return item;
    })
  }

  mostrarNombreProveedor(proveedor?: Proveedor): string {
    return proveedor ? proveedor.nombres : '';
  }

  mostrarNombre(producto?: Articulo): string {
    return producto ? producto.nombre : '';
  }

  eliminarItemFactura(id: number): void {
    this.compra.items = this.compra.items.filter((item: DetalleCompra) => id !== item.articulo.id)
  }

  actualizarValorCompra(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    this.compra.items = this.compra.items.map((item: DetalleCompra) => {
      if (id === item.articulo.id) {
        item.articulo.valorVenta = cantidad;
      }
      return item;
    })
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.compra.items = this.compra.items.map((item: DetalleCompra) => {
      if (id === item.articulo.id) {
        item.cantidad = cantidad;
      }
      return item;
    })
  }

  create(): void{
    //this.compra.proveedor = this.cliente;
    //this.compra.estadoId = ESTADO_INICIAL_PEDIDO;
    console.log(this.compra);
    this.comprasService.create(this.compra).subscribe(compra => {
      Swal.fire(this.titulo, `Pedido creado con exito!`, 'success');
      this.router.navigate(['/compras', compra.id]);
    });
  }

}

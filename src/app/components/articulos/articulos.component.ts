import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MONEDA_LABEL } from '../../data/config';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, PaginatorComponent],
  templateUrl: './articulos.component.html'
})
export class ArticulosComponent {
  paginator: any;
  pageUrl = '/articulos/page';
  page: number = 0;

  MONEDA_LABEL = MONEDA_LABEL;

  articulos: Articulo[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +(params.get('page') || '0');
      this.articuloService.obtenerArticulos(page).subscribe(
        response => {
          this.articulos = (response.content as Articulo[])
          this.paginator = response;
        }
      );
    });
  }

  delete(articulo: Articulo): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "Eliminarás completamente el registro.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ¡Eliminalo!'
    }).then((result) => {

      if (result.value) {
        this.articuloService.delete(articulo.id).subscribe(response => {
          this.articulos = this.articulos.filter(p => p !== articulo)
          Swal.fire('Articulo eliminado', `Articulo eliminado con éxito`, 'success');
        });
      }
    })
  }
}

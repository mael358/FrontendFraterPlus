import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Proveedor } from '../../models/proveedor';
import Swal from 'sweetalert2';
import { ProveedorService } from '../../services/proveedor.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule, PaginatorComponent],
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent {
  paginator: any;
  pageUrl = '/proveedores/page';
  page: number = 0;

  proveedores: Proveedor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +(params.get('page') || '0');
      this.proveedorService.getProveedores(page).subscribe(
        response => {
          this.proveedores = (response.content as Proveedor[])
          this.paginator = response;
        }
      );
    });
  }

  delete(proveedor: Proveedor): void {
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
        this.proveedorService.delete(proveedor.id).subscribe(response => {
          this.proveedores = this.proveedores.filter(p => p !== proveedor)
          Swal.fire('Proveedor eliminado', `Proveedor eliminado con éxito`, 'success');
        });
      }
    })
  }
}

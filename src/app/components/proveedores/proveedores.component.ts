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

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule],
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent {

  proveedores: Proveedor[] = [];

  constructor(private activatedRoute: ActivatedRoute,private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +(params.get('page') || '0');
      this.proveedorService.getProveedores(page).subscribe(
        response => {
          this.proveedores = (response as Proveedor[])
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
        this.proveedorService.delete(proveedor.id).subscribe((response) => {
          this.proveedores = this.proveedores.filter(p => p !== proveedor)
          Swal.fire('Cliente eliminado', `Cliente ${proveedor.nombres} eliminado con éxito`, 'success');
        });
      }
    })
  }
}

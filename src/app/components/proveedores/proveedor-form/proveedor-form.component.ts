import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './proveedor-form.component.html'
})
export class ProveedorFormComponent {
  public proveedor: Proveedor = new Proveedor();
  public titulo: string = "Crear proveedor";
  public errors: string[] = [];

  constructor(private proveedorService: ProveedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarProveedor();
    }

    public cargarProveedor(): void {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.proveedorService.getProveedor(id).subscribe(
            (proveedor) => {
              this.proveedor = proveedor;
            }
          )
        }
      });
    }

    update(): void {
      console.log(this.proveedor)
      //this.cliente.facturas = null;
      Swal.fire({
        title: '¿Estás seguro de editar?',
        text: "Puedes editarlo de nuevo pero no podrás regresar los cambios.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, ¡Editalo!'
      }).then((result) => {
        if (result.value) {
          this.proveedorService.update(this.proveedor).subscribe(
            response => {
              this.router.navigate(['/proveedores'])
              Swal.fire('Proveedor actualizado', 'El proveedor ha sido actualizado', 'success');
            },
            err => {
              this.errors = err.error.errors as string[];
              console.error("Codigo de error desde el backend: " + err.status);
              Swal.fire('Proveedor actualizado', `${this.errors[0]}`, 'error');
              console.error(this.errors);
            }
          )
        }
      })
    }

    create(): void {
      console.log(this.proveedor)
      this.proveedorService.create(this.proveedor).subscribe(
        proveedor => {
          console.log(proveedor);
          this.router.navigate(['/proveedores'])
          Swal.fire('Nuevo proveedor', `El proveedor ha sido creado con éxito!`, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error("Codigo de error desde el backend" + err.status);
          console.error(this.errors);
        }
      )
      
    }
}

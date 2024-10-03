import { Component } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-articulo-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './articulo-form.component.html'
})
export class ArticuloFormComponent {
  public articulo: Articulo = new Articulo();
  public titulo: string = "Crear articulo";
  public errors: string[] = [];

  constructor(private articuloService: ArticuloService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarArticulo();
    }

    public cargarArticulo(): void {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.articuloService.obtenerArticuloPorId(id).subscribe(
            (articulo) => {
              this.articulo = articulo;
            }
          )
        }
      });
    }

    update(): void {
      console.log(this.articulo)
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
          this.articuloService.update(this.articulo).subscribe(
            response => {
              this.router.navigate(['/articulos'])
              Swal.fire('Articulo actualizado', 'El articulo ha sido actualizado', 'success');
            },
            err => {
              this.errors = err.error.errors as string[];
              console.error("Codigo de error desde el backend: " + err.status);
              Swal.fire('Articulo actualizado', `${this.errors[0]}`, 'error');
              console.error(this.errors);
            }
          )
        }
      })
    }

    create(): void {
      console.log(this.articulo)
      this.articuloService.create(this.articulo).subscribe(
        articulo => {
          console.log(articulo);
          this.router.navigate(['/articulos'])
          Swal.fire('Nuevo articulo', `El articulo ha sido creado con éxito!`, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error("Codigo de error desde el backend" + err.status);
          console.error(this.errors);
        }
      )
      
    }
}

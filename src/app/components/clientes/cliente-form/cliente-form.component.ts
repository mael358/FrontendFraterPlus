import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClientesService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule, MatNativeDateModule, MatInputModule, MatDatepickerModule, CommonModule],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  public errors: string[] = [];

  constructor(private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarCliente();
    }

    public cargarCliente(): void {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if (id) {
          this.clienteService.getCliente(id).subscribe(
            (cliente) => {
              this.cliente = cliente;
            }
          )
        }
      });
    }

    update(): void {
      console.log(this.cliente)
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
          this.clienteService.update(this.cliente).subscribe(
            response => {
              this.router.navigate(['/clientes'])
              Swal.fire('Cliente actualizado', `${response.mensaje}`, 'success');
            },
            err => {
              this.errors = err.error.errors as string[];
              console.error("Codigo de error desde el backend: " + err.status);
              Swal.fire('Cliente actualizado', `${this.errors[0]}`, 'error');
              console.error(this.errors);
            }
          )
        }
      })
    }

    create(): void {
      console.log(this.cliente)
      this.clienteService.create(this.cliente).subscribe(
        cliente => {
          console.log(cliente);
          this.router.navigate(['/clientes'])
          Swal.fire('Nuevo cliente', `El cliente ${cliente.nombres} ha sido creado con éxito!`, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error("Codigo de error desde el backend" + err.status);
          console.error(this.errors);
        }
      )
    }
}

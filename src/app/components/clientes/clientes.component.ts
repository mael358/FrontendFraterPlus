import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorComponent],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  clienteSeleccionado!: Cliente;
  paginator: any;

  pageUrl = '/clientes/page';
  

  constructor(private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        let page: number = +(params.get('page') || '0');
        if (!page) {
          page = 0;
        }
        this.clienteService.getClientes(page).subscribe(
          response => {
            this.clientes = (response.content as Cliente[])
            this.paginator = response;
          }
        );
      });
    }
  
    delete(cliente: Cliente): void {
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
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire('Cliente eliminado', `Cliente ${cliente.nombres} eliminado con éxito`, 'success');
          });
        }
      })
    }
}

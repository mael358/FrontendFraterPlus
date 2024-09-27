import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClientesService } from '../../services/cliente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, mergeMap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorComponent, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent {

  pedidos: Pedido[] = [];
  clienteSeleccionado!: Pedido;
  paginator: any;

  autoCompleteControl = new FormControl();

  pageUrl = '/pedidos/page';
  page: number = 0;

  options = [
    { Id: 1, Name: 'Pendiente' },
    { Id: 2, Name: 'Procesado' },
    { Id: 3, Name: 'Enviado' },
    { Id: 4, Name: 'Entregado' },
    { Id: 5, Name: 'Cancelado' }
  ];
  selectedOption: any;
  textoIngresado: string = "";

  constructor(private pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.page = +(params.get('page') || '0');
        if (!this.page) {
          this.page = 0;
        }
        this.pedidoService.getPedidos(this.page, "", "").subscribe(
          response => {
            this.pedidos = (response.content as Pedido[])
            this.paginator = response;
          }
        );
      });
    }

    onTextInput(event: any): void {
      this.textoIngresado = event.target.value;
      this.textoIngresado = this.textoIngresado ? this.textoIngresado : "";

      let estado = this.selectedOption ? this.selectedOption.Id : "";
      
      this.pedidoService.getPedidos(this.page, this.textoIngresado, estado).subscribe(
        response => {
          this.pedidos = (response.content as Pedido[])
          this.paginator = response;
        }
      );
    }

    onOptionSelected(event: any): void {
      this.selectedOption = event.value;
      console.log('Selected option:', this.selectedOption);

      this.textoIngresado = this.textoIngresado ? this.textoIngresado : "";
      let estado = this.selectedOption ? this.selectedOption.Id : "";
      
      this.pedidoService.getPedidos(this.page, this.textoIngresado, estado).subscribe(
        response => {
          this.pedidos = (response.content as Pedido[])
          this.paginator = response;
        }
      );
    }
  
    delete(pedido: Pedido): void {
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
          this.pedidoService.delete(pedido.id).subscribe((response) => {
            this.pedidos = this.pedidos.filter(ped => ped !== pedido)
            Swal.fire('Cliente eliminado', `Pedido eliminado con éxito`, 'success');
          });
        }
      })
    }
}

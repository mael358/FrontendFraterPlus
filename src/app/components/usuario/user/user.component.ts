import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input()
  users: Usuario[] = [];

  @Output()
  idUserEventEmmiter: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  selectedUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  onRemoveUser(user: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el usuario
        this.idUserEventEmmiter.emit(user);
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  }

  onEditUser(user: Usuario): void {
    this.selectedUserEventEmmiter.emit(user);
  }
}

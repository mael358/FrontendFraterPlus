import { Component, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de Usuarios';

  users: Usuario[] = [];

  constructor(private sharingDataService: SharingDataService, private service: UserService,private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe((users: Usuario[]) => {
        this.users = users;
      });
    }
  }

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
        this.sharingDataService.idUserEventEmmiter.emit(user);
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  }

  onEditUser(user: Usuario): void {
    // this.sharingDataService.selectedUserEventEmmiter.emit(user);
    this.router.navigate(['/users/update', user.id], { state: { user } });
  }
}

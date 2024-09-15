import { Component, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SharingDataService } from '../../../services/sharing-data.service';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de Usuarios';

  users: Usuario[] = [];
  paginator: any = {};
  pageUrl = '/users/page';

  constructor(private sharingDataService: SharingDataService, private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      // this.service.findAll().subscribe((users: Usuario[]) => this.users = users);
      this.activatedRoute.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as Usuario[]
          this.paginator = pageable;
        });
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
        this.service.delete(user).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
        });
        this.sharingDataService.idUserEventEmmiter.emit(user);
      }
    });
  }

  onEditUser(user: Usuario): void {
    // this.sharingDataService.selectedUserEventEmmiter.emit(user);
    this.router.navigate(['/users/update', user.id]);
  }
}

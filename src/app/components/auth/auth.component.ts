import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  user: Usuario;

  constructor(private sharingData: SharingDataService) {
    this.user = new Usuario();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos!',
        'error'
      );
    } else {
      console.log("Sending user");
      this.sharingData.handlerLoginEventEmitter.emit({ username: this.user.username, password: this.user.password });
    }
  }
}

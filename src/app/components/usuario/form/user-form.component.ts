import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { SharingDataService } from '../../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  user: Usuario;

  constructor(private router: Router, private sharingDataService: SharingDataService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new Usuario();
    }
  }

  onSubmit(userForm: NgForm): void {
    // Valida que el formulario este bien
    if (userForm.invalid)
      return;

    this.sharingDataService.newUserEventEmmiter.emit(this.user);
    userForm.reset();
    userForm.resetForm();
  }
}

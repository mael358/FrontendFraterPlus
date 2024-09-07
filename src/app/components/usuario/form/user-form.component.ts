import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input()
  user: Usuario;

  @Output()
  newUserEventEmmiter: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @Output()
  openEventEmmiter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.user = new Usuario();
  }

  onSubmit(userForm: NgForm): void {
    // Valida que el formulario este bien
    if (userForm.invalid)
      return;

    this.newUserEventEmmiter.emit(this.user);
    userForm.reset();
    userForm.resetForm();
    this.onOpenClose();
  }

  onOpenClose(){
    this.openEventEmmiter.emit();
  }
}

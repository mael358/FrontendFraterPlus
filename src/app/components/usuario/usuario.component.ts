import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  title: string = 'Listdo de Usuarios';

  users: Usuario[] = [];

  userSelected: Usuario;

  open: boolean = false;

  constructor(private usersService: UserService) { 
    this.userSelected = new Usuario();
  }

  ngOnInit(): void {
    this.usersService.findAll().subscribe(users => this.users = users);
  }

  addUser(user: Usuario): void {
    console.log(user);
    if (user.id > 0){
      this.users = this.users.map(u => u.id === user.id ? {... user} : u);
      // this.usersService.update(user).subscribe(user => this.users = this.users.map(u => u.id === user.id ? user : u));
    } else {
      this.users = [... this.users, {... user}];
      // this.usersService.save(user).subscribe(user => this.users.push(user));
    }
    Swal.fire({
      title: 'Usuario Guardado',
      text: 'El usuario se ha guardado correctamente',
      icon: 'success'
    });
  }

  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    // this.usersService.delete(id).subscribe(() => this.users = this.users.filter(user => user.id !== id));
  }

  setSelectedUser(user: Usuario): void {
    console.log(user);
    this.userSelected = {... user};
    this.setOpen();
  }

  setOpen(): void {
    this.open = !this.open;
  }
}

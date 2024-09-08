import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  users: Usuario[] = [];

  constructor(private router: Router, private usersService: UserService, private sharingDataService: SharingDataService) { 
  }

  ngOnInit(): void {
    this.usersService.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.removeUser();
  }

  addUser(): void {
    this.sharingDataService.newUserEventEmmiter.subscribe(user => {
      console.log(user);
      if (user.id > 0){
        this.users = this.users.map(u => u.id === user.id ? {... user} : u);
        // this.usersService.update(user).subscribe(user => this.users = this.users.map(u => u.id === user.id ? user : u));
      } else {
        this.users = [... this.users, {... user}];
        // this.usersService.save(user).subscribe(user => this.users.push(user));
      }
      this.router.navigate(['/users'], {state: {users: this.users}});
      Swal.fire({
        title: 'Usuario Guardado',
        text: 'El usuario se ha guardado correctamente',
        icon: 'success'
      });
    });
    
  }

  removeUser(): void {
    this.sharingDataService.idUserEventEmmiter.subscribe(id => {
      this.users = this.users.filter(user => user.id !== id);  
      this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
        this.router.navigate(['/users'], {state: {users: this.users}});
      });
    });
    // this.usersService.delete(id).subscribe(() => this.users = this.users.filter(user => user.id !== id));
  }

}

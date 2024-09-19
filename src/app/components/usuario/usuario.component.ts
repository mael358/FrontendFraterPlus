import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  users: Usuario[] = [];
  paginator: any = {};

  constructor(private router: Router, private usersService: UserService, 
    private sharingDataService: SharingDataService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.usersService.findAll().subscribe(users => this.users = users);
    this.activatedRoute.paramMap.subscribe(params => {
      const page = +(params.get('page') || '0');
      this.usersService.findAllPageable(page).subscribe(pageable => {
        this.users = pageable.content as Usuario[]
        this.paginator = pageable;
      });
    });
    this.addUser();
    this.removeUser();
    this.removeUser();
    this.findUserById();
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingDataService.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      console.log(username + ' ' + password);

      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);

          const user = { username: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Error en el Login', error.error.message, 'error')
          } else {
            throw error;
          }
        }
      })
    })
  }

  findUserById(){
    this.sharingDataService.findUserByIdEventEmmiter.subscribe(id => {
      const user = this.users.find(user => user.id === id);
      this.sharingDataService.selectUserEventEmmiter.emit(user);
    });
  }

  addUser(): void {
    this.sharingDataService.newUserEventEmmiter.subscribe(user => {
      if (user.id > 0)
        this.usersService.update(user).subscribe(userUpdated => this.users = this.users.map(u => u.id === userUpdated.id ? {... userUpdated} : u));
      else
        this.usersService.create(user).subscribe(user => this.users = [... this.users, {... user}]);
      
      this.router.navigate(['/users']);
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
        this.router.navigate(['/users']);
      });
    });
    // this.usersService.delete(id).subscribe(() => this.users = this.users.filter(user => user.id !== id));
  }

}

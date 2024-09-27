import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';
import { SharingDataService } from './services/sharing-data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceComponent, CommonModule, RouterOutlet, UsuarioComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FacturasApp';

  constructor(private router: Router,
    private sharingDataService: SharingDataService,
    private authService: AuthService){}

  ngOnInit(): void {

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
          this.router.navigate(['/pedidos/']);
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
}

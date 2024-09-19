import { HttpHandler, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
        catchError(e => {
            if (e.status == 401) {
                if (authService.authenticated()) {
                    authService.logout();
                }
                router.navigate(['/login']);
            }

            if (e.status == 403) {
                swal.fire('Acceso denegado', `No tienes acceso a este recurso`, 'warning');
                router.navigate(['/usuarios']);
            }

            return throwError(e);
        })
    );
}

/*
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){ }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      //en este return estamos validando el response, no lo que enviamos
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this.authService.authenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          swal.fire('Acceso denegado', `No tienes acceso a este recurso`, 'warning');
          this.router.navigate(['/usuarios']);
        }

        return throwError(e);
      })
    );
  }
}
  */

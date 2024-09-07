import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario';
import { URL_BACKEND } from '../data/config';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private users: Usuario[] = [
        {id: 1, username: 'mael358', nombre: 'Marcos', apellido: 'Velasquez', password: 'admin', email: 'marcos@gmail.com', roles: ['ROLE_ADMIN', 'ROLE_USER']},
        {id: 2, username: 'dialvehid', nombre: 'Diego', apellido: 'Velasquez', password: 'admin2', email: 'diego@gmail.com', roles: ['ROLE_ADMIN', 'ROLE_USER']}
    ];

    findAll(): Observable<Usuario[]> {
        return of(this.users);
    }
  
}

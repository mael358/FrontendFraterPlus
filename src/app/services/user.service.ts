import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario';
import { URL_BACKEND } from '../data/config';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = `${URL_BACKEND}/usuarios`;

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Usuario[]> {
        return this.httpClient.get<Usuario[]>(this.baseUrl);
    }

    findAllPageable(page: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/page/${page}`);
    }
  
    findUserById(id: number): Observable<Usuario> {
        return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
    }

    create(user: Usuario): Observable<Usuario> {
        return this.httpClient.post<Usuario>(this.baseUrl, user);
    }

    update(user: Usuario): Observable<Usuario> {
        return this.httpClient.put<Usuario>(`${this.baseUrl}/${user.id}`, user);
    }

    delete(id: number): Observable<void> {
        console.log(`${this.baseUrl}/${id}`);
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}

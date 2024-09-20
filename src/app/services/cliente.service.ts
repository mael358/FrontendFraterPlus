import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../data/config';
import { Cliente } from '../models/cliente';


@Injectable({
    providedIn: 'root'
})
export class ClientesService {
  private urlEndPoint: string = URL_BACKEND + '/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }
/*
  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.urlEndPoint + "/municipios");
  }
*/

  //Ejemplo de GET
  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombres);
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(
          cliente => {
            cliente.nombres = cliente.nombres.toUpperCase();
            cliente.apellidos = cliente.apellidos.toUpperCase();
            let datePipe = new DatePipe('es');
            cliente.fechaNacimiento = datePipe.transform(cliente.fechaNacimiento, 'fullDate') || '';
            return cliente;
          });
        return response;
      })
    );
  }

  //Ejemplo de POST
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

}

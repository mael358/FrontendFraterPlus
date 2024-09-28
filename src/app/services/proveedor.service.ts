import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../data/config';
import { Cliente } from '../models/cliente';
import { Proveedor } from '../models/proveedor';
import { proveedoresData } from '../data/proveedores.data';


@Injectable({
    providedIn: 'root'
})
export class ProveedorService {
  private urlEndPoint: string = URL_BACKEND + '/proveedores';

  constructor(private http: HttpClient, private router: Router) { }

  //Ejemplo de GET
  getProveedores(page: number): Observable<Proveedor[]> {
    return of(proveedoresData);
  }

  //Ejemplo de POST
  create(cliente: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Proveedor),
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

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/proveedores']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Proveedor): Observable<any> {
    console.log(cliente);
    return this.http.put<Proveedor>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
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

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  filtrarProveedores(term: string): Observable<Proveedor[]> {
    const filterValue = term.toLowerCase();
    return this.http.get<Proveedor[]>(`${this.urlEndPoint}/filtrar-proveedores/${filterValue}`);
  }

}

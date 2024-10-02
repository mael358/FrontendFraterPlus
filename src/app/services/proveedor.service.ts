import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PAGE_SIZE, URL_BACKEND } from '../data/config';
import { Proveedor } from '../models/proveedor';
import { proveedoresData } from '../data/proveedores.data';


@Injectable({
    providedIn: 'root'
})
export class ProveedorService {
  private urlEndPoint: string = URL_BACKEND + '/proveedor';

  private proveedores : any = proveedoresData;

  constructor(private http: HttpClient, private router: Router) { }

  //Ejemplo de GET
  getProveedores(page: number): Observable<any> {
    //return of(proveedoresData);
    return this.http.get<any>(`${this.urlEndPoint}?page=${page}&size=${PAGE_SIZE}`);
  }

  //Ejemplo de POST
  create(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.urlEndPoint}/crear`, proveedor).pipe(
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
    //return of(this.proveedores[1]);
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

  update(proveedor: Proveedor): Observable<any> {
    console.log(proveedor);
    return this.http.put<Proveedor>(`${this.urlEndPoint}/editar`, proveedor).pipe(
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

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/eliminar?id=${id}`).pipe(
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

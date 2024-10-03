import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PAGE_SIZE, URL_BACKEND } from '../data/config';
import { Articulo } from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  public urlEndPoint: string = URL_BACKEND + '/articulos';

  constructor(private http: HttpClient) { }

//   getFactura(id: number): Observable<Factura>{
//   }

//   delete(id: number){
//   }

  obtenerArticulos(page: number): Observable<any>{
    return this.http.get<Articulo[]>(`${this.urlEndPoint}?page=${page}&size=${PAGE_SIZE}`);
  }

  obtenerArticuloPorId(id: number): Observable<Articulo>{
    return this.http.get<Articulo>(`${this.urlEndPoint}/${id}`);
  }

  create(articulo: Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(this.urlEndPoint, articulo);
  }

  update(articulo: Articulo): Observable<Articulo>{
    return this.http.put<Articulo>(`${this.urlEndPoint}/${articulo.id}`, articulo);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.urlEndPoint}/filtrar-articulo/${term}`);
  }

//   create(factura: Factura): Observable<Factura>{
//   }
}

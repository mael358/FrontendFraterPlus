import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from '../data/config';
import { Factura } from '../models/factura';
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

  filtrarProductos(term: string): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.urlEndPoint}/filtrar-articulo/${term}`);
  }

//   create(factura: Factura): Observable<Factura>{
//   }
}

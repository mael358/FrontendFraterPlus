import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PAGE_SIZE, URL_BACKEND } from '../data/config';
import { Articulo } from '../models/articulo';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  public urlEndPoint: string = URL_BACKEND + '/inventario';

  private defaultSort: string = 'fecha,desc';

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

  obtenerInventario(page: number, search: string): Observable<any>{ 
    return this.http.get<any>(`${this.urlEndPoint}?page=${page}&size=${PAGE_SIZE}&sort=${this.defaultSort}&nombre=${search}&articuloid=`);
  }
}

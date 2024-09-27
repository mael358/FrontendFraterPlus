import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { URL_BACKEND } from '../data/config';
import { Articulo } from '../models/articulo';
import { comprasData } from '../data/compras.data';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  public urlEndPoint: string = URL_BACKEND + '/compras';

  private compras: any = comprasData;

  constructor(private http: HttpClient) { }

  obtenerCompras(page: number, term: string): Observable<any>{
    return of(this.compras);
    //return this.http.get(`${this.urlEndPoint}?page=${page}&term=${term}`);
  }

  filtrarProductos(term: string): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.urlEndPoint}/filtrar-articulo/${term}`);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

}

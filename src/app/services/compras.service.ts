import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PAGE_SIZE, URL_BACKEND } from '../data/config';
import { Articulo } from '../models/articulo';
import { comprasData } from '../data/compras.data';
import { Compra } from '../models/compra';
import { CompraDTO } from '../models/dtos/compraDTO';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private urlEndPoint: string = URL_BACKEND + '/api/facturas/compra';
  private urlEndPointDelete: string = URL_BACKEND + '/api/facturas/anular';

  private compras: any = comprasData;

  constructor(private http: HttpClient) { }

  obtenerCompras(page: number, term: string): Observable<any>{
    //return of(this.compras);
    return this.http.get(`${this.urlEndPoint}?page=${page}&size=${PAGE_SIZE}`);
  }

  create(compra: Compra) : Observable<Compra>{
    let compraDto = new CompraDTO(compra);
    console.log(compraDto);
    return this.http.post<Compra>(this.urlEndPoint, compraDto);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.urlEndPointDelete}/${id}`);
  }

  getCompra(id: number){
    return this.http.get<Compra>(`${this.urlEndPoint}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { URL_BACKEND, PAGE_SIZE } from '../data/config';
import { Pedido } from '../models/pedido';
import { pedidoData } from '../data/pedido.data';
import { PedidoDTO } from '../models/dtos/pedidoDTO';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public urlEndPoint: string = URL_BACKEND + '/pedidos';

  private defaultSort: string = 'fecha,desc';

  constructor(private http: HttpClient) { }

  getPedido(id: number): Observable<Pedido>{
    
    //return of(this.pedido);
    return this.http.get<Pedido>(`${this.urlEndPoint}/${id}`);
  }

  getPedidos(page: number, nombre: string, estado: string): Observable<any>{
    // return this.http.get<any>(`${this.urlEndPoint}`);
    return this.http.get<Pedido[]>(`${this.urlEndPoint}/busqueda?page=${page}&size=${PAGE_SIZE}&sort=${this.defaultSort}&nombres=${nombre}&estado=${estado}`);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  create(pedido: Pedido): Observable<Pedido>{
    let pedidoDTO = new PedidoDTO(pedido);
    console.log(pedidoDTO);
    return this.http.post<Pedido>(`${this.urlEndPoint}`, pedidoDTO);
  }
}

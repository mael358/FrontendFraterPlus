import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from '../data/config';
import { Pedido } from '../models/pedido';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public urlEndPoint: string = URL_BACKEND + '/pedidos';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  create(pedido: Pedido): Observable<Pedido>{
    //TODO: Convertir pedido a pedidoDto

    let pedidoDto = {
      fecha: new Date() + "",
      clienteId: pedido.cliente.id + "",
      detalles: pedido.items
    }

    console.log(pedidoDto);

    return this.http.post<Pedido>(`${this.urlEndPoint}`, pedido);
  }
}

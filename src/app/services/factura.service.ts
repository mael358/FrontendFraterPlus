import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PAGE_SIZE, URL_BACKEND } from '../data/config';
import { Factura } from '../models/factura';
import { FacturaDTO } from '../models/dtos/facturaDTO';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = URL_BACKEND + '/api/facturas/venta';
  private anularEndpoint: string = URL_BACKEND + '/api/facturas/anular';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  obtenerFacturas(page: number, texto: string): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}?page=${page}&size=${PAGE_SIZE}`);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.anularEndpoint}/${id}`);
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(`${this.urlEndPoint}`, factura);
  }

  facturarPedido(factura: FacturaDTO): Observable<Factura>{
    return this.http.post<Factura>(`${this.urlEndPoint}`, factura);
  }
}

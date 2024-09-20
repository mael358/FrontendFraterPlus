import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from '../data/config';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public urlEndPoint: string = URL_BACKEND + '/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(`${this.urlEndPoint}`, factura);
  }
}

import { Cliente } from "./cliente";
import { DetalleFactura } from "./detalleFactura";

export class Factura {
  id!: number;
  no_factura!: string;
  
  // Emisor
  nit_emisor: string;
  nombre_emisor: string;
  direccion_emisor: string;
  departamento_receptor: string | null;

  tipo_factura: boolean;
  fecha_creacion!: string;
  detalle_factura!: Array<DetalleFactura>;
  monto_total!: number;
  observaciones: string;


  proveedorid: number = 0;
  cliente_id!: Cliente;

  calcularGranTotal(): number{
    this.monto_total = 0;
    this.detalle_factura.forEach((item) => {
      this.monto_total += item.calcularTotalVenta();
    })
    return this.monto_total || 0;
  }

  constructor() {
    this.id = 0;
      this.no_factura = "";
      this.nit_emisor = "";
      this.nombre_emisor = "";
      this.monto_total = 0;
      this.direccion_emisor = "";
      this.tipo_factura = false;
      this.departamento_receptor = null;
      this.observaciones = "";
      this.detalle_factura = [];
      this.monto_total = 0;
  }
}

/*
Fecha
Cliente -> Nombre, Direccion y telefono
Transporte
Articulos -> Nombre, cantidad, precio de venta, valor total
*/

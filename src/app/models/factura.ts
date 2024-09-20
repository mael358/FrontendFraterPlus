import { Cliente } from "./cliente";
import { DetalleFactura } from "./detalleFactura";

export class Factura {
  id!: number;
  descripcion!: string;
  observacion!: string;
  items: Array<DetalleFactura> = [];
  cliente!: Cliente;
  total!: number;
  createAt!: string;

  calcularGranTotal(): number{
    this.total = 0;
    this.items.forEach((item) => {
      this.total += item.calcularTotalVenta();
    })
    return this.total || 0;
  }
}

/*
Fecha
Cliente -> Nombre, Direccion y telefono
Transporte
Articulos -> Nombre, cantidad, precio de venta, valor total
*/

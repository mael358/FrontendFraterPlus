import { Cliente } from "./cliente";
import { DetallePedido } from "./detallePedido";

export class Pedido {
  id!: number;
  descripcion!: string;
  observacion!: string;
  items: Array<DetallePedido> = [];
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

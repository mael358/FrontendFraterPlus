import { Cliente } from "./cliente";
import { DetallePedido } from "./detallePedido";
import { DetallePedidoDTO } from "./dtos/detallePedidoDTO";

export class Pedido {
  id!: number;
  descripcion!: string;
  observaciones!: string;
  estado!: string;
  estadoId!: number;
  items: Array<DetallePedido> = [];
  detalles: Array<DetallePedidoDTO> = [];
  //cliente!: Cliente;
  cliente!: string;
  clienteObj!: Cliente;
  total!: number;
  fecha!: string;

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

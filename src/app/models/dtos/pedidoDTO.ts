import { Pedido } from "../pedido";
import { DetallePedidoDTO } from "./detallePedidoDTO";

  export class PedidoDTO {
    cliente!: number;
    estado!: number;
    observaciones: string = '';
    detalles: Array<DetallePedidoDTO> = [];

    constructor(pedido: Pedido) {
      this.cliente = pedido.clienteObj.id; // Assuming cliente has an id property
      this.estado = pedido.estadoId;
      this.observaciones = pedido.observaciones ? pedido.observaciones : '';
      let lineCounter = 1;
      this.detalles = pedido.items.map(detalle =>  new DetallePedidoDTO(lineCounter++, detalle));
    }

  }
  
  /*
  {
    "cliente": 1,
    "estado": 2,
    "observaciones": "pedido de prueba",
    "detalles": [
        {
            "articulo": 1,
            "cantidad": 5,
            "precio": 15.5,
            "linea": 1
        },
        {
            "articulo": 2,
            "cantidad": 3,
            "precio": 5.5,
            "linea": 2
        },
        {
            "articulo": 3,
            "cantidad": 10,
            "precio": 10.5,
            "linea": 3
        }
    ]
}
  */  
import { DetallePedido } from "../detallePedido";


export class DetallePedidoDTO {
    articulo!: number;
    cantidad!: number;
    precio!: number;
    linea!: number;

    //Reporteria
    cantidadDisponible: number = 0;

    constructor(linea: number, detalle: DetallePedido) {
      this.articulo = detalle.articulo.id;
      this.cantidad = +detalle.cantidad;
      this.precio = +detalle.articulo.valorVenta;
      this.linea = linea;
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
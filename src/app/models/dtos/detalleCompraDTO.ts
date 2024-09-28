import { DetalleCompra } from "../detalleCompra";

export class DetalleCompraDTO {
    articuloId!: number;
    articulo!: number;
    cantidad!: number;
    precio!: number;
    linea!: number;

    constructor(linea: number, detalle: DetalleCompra) {
        this.articuloId = detalle.articuloid.id;
        this.articulo = detalle.articuloid.id;
        this.cantidad = +detalle.cantidad;
        this.precio = +detalle.articuloid.valorCosto;
        this.linea = linea;
      }
}
import { DetalleFactura } from "../detalleFactura";

export class DetalleFacturaDTO {
    articuloId!: number;
    articulo!: number;
    cantidad!: number;
    precio!: number;
    linea!: number;
/*
    constructor(linea: number, detalle: DetalleFactura) {
        this.articuloId = detalle.articuloid.id;
        this.articulo = detalle.articuloid.id;
        this.cantidad = +detalle.cantidad;
        this.precio = +detalle.articuloid.valor_costo;
        this.linea = linea;
      }
        */
}
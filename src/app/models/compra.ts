import { DetalleCompra } from "./detalleCompra";

export class Compra {
    id!: number;
    proveedor!: string;
    factura!: string;
    fechaCreacion!: string;
    items: Array<DetalleCompra>;
    total!: number;

    observaciones: string;

    calcularGranTotal(): number{
        this.total = 0;
        this.items.forEach((item) => {
          this.total += item.calcularTotalCosto();
        })
        return this.total || 0;
      }

    constructor() {
        this.id = 0;
        this.proveedor = "";
        this.factura = "";
        this.fechaCreacion = "";
        this.items = [];
        this.observaciones = "";
        this.total = 0;
    }
}

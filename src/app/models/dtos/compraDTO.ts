import { Compra } from "../compra";
import { DetalleCompra } from "../detalleCompra";
import { DetalleCompraDTO } from "./detalleCompraDTO";

export class CompraDTO {
    id: number = 0;
    idProveedor!: number;
    observacion!: string;
    numero!: string;
    detalles: Array<DetalleCompraDTO>;

    constructor(compra: Compra) {
        this.idProveedor = compra.proveedor_id.id; // Assuming cliente has an id property
        this.observacion = compra.observaciones ? compra.observaciones : '';
        this.numero = compra.no_factura ? compra.no_factura : '';
        let lineCounter = 1;
        this.detalles = compra.detalle_factura.map(detalle =>  new DetalleCompraDTO(lineCounter++, detalle));
      }
}

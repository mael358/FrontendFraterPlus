import { Factura } from "../factura";
import { DetalleFacturaDTO } from "./detalleFacturaDTO";

export class FacturaDTO {
    id: number = 0;
    idCliente!: number;
    observacion!: string;
    numero!: string;
    detalles: Array<DetalleFacturaDTO> = [];

    constructor() {
      }
}

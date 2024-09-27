
export class Compra {
    id!: number;
    proveedor!: string;
    factura!: string;
    fechaCreacion!: string;

    constructor() {
        this.id = 0;
        this.proveedor = "";
        this.factura = "";
        this.fechaCreacion = "";
    }
}

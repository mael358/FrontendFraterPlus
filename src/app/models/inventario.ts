
export class Inventario {
    id: number;
    descripcionDeArticulo: string;
    cantidadEnExistenciaActual: number;
    fechaDeCreacionDelLoteMasAntiguo: string;
    ultimoMovimientoDeLote: string;
    tipoDeMovimientoDeLote: number;

    constructor() {
        this.id = 1;
        this.descripcionDeArticulo = "";
        this.cantidadEnExistenciaActual = 0;
        this.fechaDeCreacionDelLoteMasAntiguo = "";
        this.ultimoMovimientoDeLote = "";
        this.tipoDeMovimientoDeLote = 0;
    }
}
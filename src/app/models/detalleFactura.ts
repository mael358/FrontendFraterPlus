import { Articulo } from "./articulo";

export class DetalleFactura {
    id!: number;
    cantidad!: number;
    articuloid!: Articulo;
    precio_unitario!: number;
    no_linea!: number;
    
    calcularTotalCosto(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articuloid.valorCosto;
    }

    calcularTotalVenta(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articuloid.valorVenta;
    }
}
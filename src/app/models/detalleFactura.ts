import { Articulo } from "./articulo";

export class DetalleFactura {
    id!: number;
    cantidad!: number;
    articulo!: Articulo;
    
    calcularTotalCosto(): number{
        return this.cantidad * this.articulo.valorCosto;
    }

    calcularTotalVenta(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articulo.valorVenta;
    }
}
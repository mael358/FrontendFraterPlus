import { Articulo } from "./articulo";

export class DetallePedido {
    id!: number;
    cantidad!: number;
    articulo!: Articulo;
    
    calcularTotalCosto(): number{
        return this.cantidad * this.articulo.valor_costo;
    }

    calcularTotalVenta(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articulo.valor_venta;
    }
}
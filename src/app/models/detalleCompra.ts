import { Articulo } from "./articulo";

export class DetalleCompra {
    id!: number;
    cantidad!: number;
    articuloid!: Articulo;
    precio_unitario!: number;
    no_linea!: number;
    
    calcularTotalCosto(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articuloid.valor_costo;
    }

    calcularTotalVenta(): number{
        if (this.cantidad === 0 || !this.cantidad)
            return 0;
        return this.cantidad * this.articuloid.valor_venta;
    }
}

/*
        {
            "id": 22,
            "cantidad": 50,
            "precio_unitario": 10.5,
            "no_linea": 1,
            "articuloid": {
                "id": 1,
                "nombre": "Laptop HP",
                "descripcion": "Laptop HP Core i5, 8GB RAM, 256GB SSD",
                "valor_costo": 4500.0000,
                "valor_venta": 5000.0000
            },
            "precioUnitario": 10.5,
            "noLinea": 1
        }
*/
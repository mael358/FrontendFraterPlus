import { DetalleCompra } from "./detalleCompra";

export class Compra {
    id!: number;
    no_factura!: string;
    
    // Emisor
    nit_emisor: string;
    nombre_emisor: string;
    direccion_emisor: string;
    departamento_receptor: string | null;

    tipo_factura: boolean;
    fecha_creacion!: string;
    detalle_factura!: Array<DetalleCompra>;
    monto_total!: number;
    observaciones: string;


    proveedorid: number = 0;


    calcularGranTotal(): number{
        this.monto_total = 0;
        this.detalle_factura.forEach((item) => {
          this.monto_total += item.calcularTotalCosto();
        })
        return this.monto_total || 0;
      }

    constructor() {
      this.id = 0;
        this.no_factura = "";
        this.nit_emisor = "";
        this.nombre_emisor = "";
        this.monto_total = 0;
        this.direccion_emisor = "";
        this.tipo_factura = false;
        this.departamento_receptor = null;
        this.observaciones = "";
        this.detalle_factura = [];
        this.monto_total = 0;
    }

    /*
    
    {
      "id": 30,
      "no_factura": "FC-001",
    "nit_emisor": "12345678",
    "nombre_emisor": "Carlos",
    "monto_total": 975.0,
    "direccion_emisor": "Zona 1, Ciudad de Guatemala",
    "tipo_factura": false,
    "departamento_receptor": null,
    "observaciones": "Compra de materiales de oficina",
    "detalle_factura": [
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
        },
        {
            "id": 23,
            "cantidad": 30,
            "precio_unitario": 15.0,
            "no_linea": 1,
            "articuloid": {
                "id": 2,
                "nombre": "Mouse Logitech",
                "descripcion": "Mouse inalámbrico Logitech, color negro",
                "valor_costo": 150.0000,
                "valor_venta": 200.0000
            },
            "precioUnitario": 15.0,
            "noLinea": 1
        }
    ],
    "direccionEmisor": "Zona 1, Ciudad de Guatemala",
    "tipoFactura": false,
    "nitEmisor": "12345678"
}
    */
}


export const comprasData: any = {
    totalPages: 3,
    totalElements: 9,
    pageable: {
        pageNumber: 0,
        pageSize: 4,
        sort: {
            sorted: true,
            unsorted: false,
            empty: false
        },
        offset: 0,
        paged: true,
        unpaged: false
    },
    first: true,
    last: true,
    size: 4,
    content: [
        {
            id: 30,
            no_factura: "FC-001",
            nit_emisor: "12345678",
            nombre_emisor: "Carlos",
            monto_total: 975.0,
            direccion_emisor: "123 Main St",
            tipo_factura: true,
            departamento_receptor: "Finance",
            observaciones: "Paid in full",
            fecha_creacion: "2024-09-18T10:30:00Z",
            detalle_factura: [
                { id: 1, cantidad: 2, precio_unitario: 100.0 },
                { id: 2, cantidad: 3, precio_unitario: 75.0 }
            ],
            total: 975.0,
            items: [
                { calcularTotalCosto: () => 200.0 },
                { calcularTotalCosto: () => 225.0 }
            ]
        }
    ],
    number: 0,
    sort: {
        sorted: true,
        unsorted: false,
        empty: false
    },
    numberOfElements: 4,
    empty: false
}

/*
{
    "totalPages": 1,
    "totalElements": 1,
    "pageable": {
        "pageNumber": 0,
        "pageSize": 10,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "first": true,
    "last": true,
    "size": 10,
    "content": [
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
    ],
    "number": 0,
    "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
    },
    "numberOfElements": 1,
    "empty": false
}
*/
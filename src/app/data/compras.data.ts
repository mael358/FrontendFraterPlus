import { Invoice } from "../models/invoice";

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
            id: 1,
            proveedor: "Fulano de Tal",
            factura: "UCI-001",
            fechaCreacion: "2024-09-18T10:30:00Z"
        },
        {
            id: 2,
            proveedor: "Mengano de Cual",
            factura: "UCI-002",
            fechaCreacion: "2024-09-21T10:30:00Z"
        },
        {
            id: 3,
            proveedor: "Zutano de Cual",
            factura: "UCI-003",
            fechaCreacion: "2024-09-22T10:30:00Z"
        },
        {
            id: 4,
            proveedor: "Perengano de Cual",
            factura: "UCI-004",
            fechaCreacion: "2024-09-25T10:30:00Z"
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
            "id": 1,
            "proveedor": "Fulano de Tal",
            "factura": "UCI-001",
            "fechaCreacion": "2024-09-01T10:30:00Z"
        },
        {
            "id": 2,
            "proveedor": "Mengano de Cual",
            "factura": "UCI-002",
            "fechaCreacion": "2024-09-01T10:30:00Z"
        },
        {
            "id": 3,
            "proveedor": "Zutano de Cual",
            "factura": "UCI-003",
            "fechaCreacion": "2024-09-01T10:30:00Z"
        },
        {
            "id": 4,
            "proveedor": "Perengano de Cual",
            "factura": "UCI-004",
            "fechaCreacion": "2024-09-01T10:30:00Z"
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
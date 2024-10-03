import { Pedido } from "../models/pedido";

export const pedidoData: any = {
    id: 1,
    name: 'Componentes de PC',
    observacion: 'Una observacion random',
    cliente : {
        nombres: 'Nombre ejemplo',
        direccion: 'Calle 123',
        nit: '123456789'
    },
    items: [
        {
            id: 1,
            articulo: {
                id: 1,
                nombre: 'Motherboard',
                valor_costo: 100,
                valor_venta: 150
            },
            cantidad: 1
        },
        {
            id: 2,
            articulo: {
                id: 1,
                nombre: 'CPU',
                valor_costo: 100,
                valor_venta: 150
            },
            cantidad: 1
        },
        {
            id: 3,
            articulo: {
                id: 1,
                nombre: 'Asus',
                valor_costo: 100,
                valor_venta: 150
            },
            cantidad: 2
        }
    ]
}
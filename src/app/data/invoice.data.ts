import { Invoice } from "../models/invoice";

export const invoiceData: any = {
    id: 1,
    name: 'Componentes de PC',
    client : {
        name: 'Juan',
        lastName: 'Perez',
        address: {
            country: 'USA',
            city: 'Los Angeles',
            street: 'Main St',
            number: 15
        }
    },
    company: {
        name: 'New Age',
        fiscalNumber: 3121321
    },
    items: [
        {
            id: 1,
            product: 'Motherboard',
            price: 150,
            quantity: 1
        },
        {
            id: 2,
            product: 'CPU',
            price: 300,
            quantity: 1
        },
        {
            id: 3,
            product: 'Asus',
            price: 599,
            quantity: 2
        }
    ]
}
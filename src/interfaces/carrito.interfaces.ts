import { DireccionE } from "./login.interfaces";

export interface NewCarritoI {
    userId: string,
    productos: [],
    timestamp: Date, // fecha de creación y update
    direccion: DireccionE
}

export interface CarritoI {
    _id: string,
    userId: string,
    productos: [ProdCarritoI],
    timestamp: Date, // fecha de creación y update
    direccion: DireccionE
}

export interface ProdCarritoI {
    _id: string,
    itemId: string,
    cantidad: number,
    timestamp: Date
}




import { DireccionE } from "./login.interfaces";

export interface NewCarritoI {
    userId: string,
    productos: [],
    timestamp: Date, // fecha de creación y update
    direccion: DireccionE
}

export interface CarritoI {
    userId: string,
    productos: [ProdCarritoI],
    timestamp: Date, // fecha de creación y update
    direccion: DireccionE
}

export interface ProdCarritoI {
    itemId: string,
    cantidad: number,
    timestamp: Date
}




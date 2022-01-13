export type CarritoArray = Array<CarritoInterface>;

export interface CarritoInterface {
    _id: string, 
    timestamp: string,
    user: string,
    producto: [{
        _id: string,
        nombre: string,
        descripcion: string,
        codigo: string,
        foto: string,
        precio: number,
        cantidad: number,
        timestamp: string
    }],
    abierto:boolean
}

export interface NewCarritoInterface {
    timestamp: string,
    user: string,
    producto: CarritoInterface[],
    abierto:boolean
}

export interface CarritoI {
    userId: string,
    productos: [ProdCarritoI],
    timestamp: Date, // fecha de creación y update
    direccion: DireccionI
}

export interface ProdCarritoI {
    itemId: string,
    cantidad: number,
    timestamp: Date
}

export interface DireccionI {
    calle: string,
    altura: string,
    codigoPostal: string,
    piso?: number,
    departamento?: number
}
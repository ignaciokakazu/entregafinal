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

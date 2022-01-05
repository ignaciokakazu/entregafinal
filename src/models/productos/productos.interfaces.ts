export type ProductoArray = Array<ProductoInterface>;

export interface ProductoInterface {
    _id: string, 
    //timestamp: string,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
    timestamp: string
}

export interface NewProductoInterface {
    //id: number, 
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
    timestamp: string
}


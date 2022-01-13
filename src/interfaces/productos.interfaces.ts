export type ProductoArray = Array<ProductoInterface>;

export interface ProductoInterface {
    _id: string|number, 
    nombre: string,
    descripcion: string,
    codigo: string,
    fotos: string[],
    precio: number,
    stock: number,
    timestamp: Date,
    idCategoria: string
}

export interface NewProductoInterface {
    //id: number, 
    nombre: string,
    descripcion: string,
    codigo: string,
    fotos: string[],
    precio: number,
    stock: number,
    idCategoria: string
    timestamp: Date
}

export interface Categoria {
    nombre: string
}

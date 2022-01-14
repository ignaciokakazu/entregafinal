
export interface OrdenI {
    _id: string,
    userId: string,
    items: [ItemsI],
    timestamp: Date,
    estado: string, 
    total: number
}

export interface ItemsI {
    itemId: string,
    cantidad: number,
    precio: number
}

enum ESTADO_VALUES {
    GENERADO = 'GENERADO', 
    PAGADO = 'PAGADO', 
    ENVIADO = 'ENVIADO', 
    FINALIZADO = 'FINALIZADO'
}



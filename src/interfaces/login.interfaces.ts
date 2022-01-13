export interface NewUserI {
    name: string,
    surname: string,
    username: string,
    password: string,
    passwordConfirmation: string,
    tel: number,
    direccion: DireccionE,
    admin: boolean
}

export interface DireccionE {
    calle: string,
    altura: number,
    codigoPostal: string,
    piso?: number,
    departamento?: string|number,
}

/* el usuario que no es nuevo ya tiene un _id */
export interface UserI {   
    _id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    tel: number,
    admin: boolean,
    timestamp: Date,
    direccion: DireccionE
}

export interface LoginI {
    username: string,
    password: string
}
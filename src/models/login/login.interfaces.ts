import joi, { NumberSchema } from 'joi';

export interface NewUserI {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    avatar: string,
    direction: string,
    tel: number,
    age: number,
    country: string  
}

/* el usuario que no es nuevo ya tiene un _id */
export interface UserI {   
    _id: string,
    name: string,
    email: string,
    password: string,
    avatar: string,
    direction: string,
    tel: number,
    age: number,
    country: string
}
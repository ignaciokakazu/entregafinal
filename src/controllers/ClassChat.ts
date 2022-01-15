import {Request, Response, NextFunction} from 'express';
import {api} from '../apis/api';
import {apiLogin} from '../apis/login';
import {tokenJWT} from './ClassLogin';
import jwtDecode from 'jwt-decode';
import {infoLogger} from '../services/logger';

class ClassChat {
 
    constructor() {

    }

    async sendMsg(data: any) {
//         Se enviara un socket con el nombre “resp-message” y la respuesta tendrá la siguiente lógica:

// A) “Stock” => Se responderá con el stock actual de todos los productos
// B) “Orden” => Se responderá con los datos de la ultima orden del usuario
// C) “Carrito” => Se responderá con los datos del carrito del usuario.
// D) Cualquier otro mensaje se deberá responder con el siguiente mensaje:
        if (!tokenJWT) {
            return {error: 'se tiene que logear para obtener el token'}
        }

        const decoded = await jwtDecode(tokenJWT.token);
        infoLogger.info('decoded')
        infoLogger.info(decoded)

        if (!decoded) {
            return {error: 'token no válido'}
        }

        if (data.mensaje.toUpperCase() === 'STOCK') {
        
            const productos: any = await api.getProductosAll();
            let prodStock:any = [];

            productos.forEach((prod: any)=> {
                infoLogger.log(prod)
                prodStock.push({
                    nombre: prod.nombre,
                    stock: prod.stock
                })
            })

            //guardar en BD
            const userId = await apiLogin.getByEmail(tokenJWT.user);

            await api.setMensajes({
                userId: userId._id,
                mensaje: data.mensaje,
                tipo: 1 //1 para usuario
            })

            await api.setMensajes({
                userId: userId._id,
                mensaje: prodStock,
                tipo: 0
            })

            return {msg: prodStock}

        } else if (data.mensaje.toUpperCase() === 'ORDEN') {

            const userId = await apiLogin.getByEmail(tokenJWT.user);

            const orden: any = await api.getOrderByUserId(userId._id);
            
            await api.setMensajes({
                userId: userId._id,
                mensaje: data.mensaje,
                tipo: 1 //1 para usuario
            })

            await api.setMensajes({
                userId: userId._id,
                mensaje: orden,
                tipo: 0
            })

            return {msg: orden}

        } else if (data.mensaje.toUpperCase() === 'CARRITO') {

            const userId = await apiLogin.getByEmail(tokenJWT.user);

            const orden: any = await api.getCarritoById(userId._id);
            
            await api.setMensajes({
                userId: userId._id,
                mensaje: data.mensaje,
                tipo: 1 //1 para usuario
            })

            await api.setMensajes({
                userId: userId._id,
                mensaje: orden,
                tipo: 0
            })

            return {msg: orden}

        } else {
            //guardar en BD
            return {msg: `Hola! No he podido comprender tu mensaje. 
                Por favor ingresa una de las siguientes opciones. 
                * Stock: para conocer nuestro stock actual
                * Orden: Para conocer la información de tu última orden
                * Carrito: para conocer el estado actual de tu carrito`}
        
        }
    }
   

}

export const Chat = new ClassChat()
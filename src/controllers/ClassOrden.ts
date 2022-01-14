import { OrdenI } from '../interfaces/orden.interfaces';
import {Request, Response} from 'express';
import { api } from '../apis/api';
import {Login, tokenJWT} from './ClassLogin';
import EmailService from '../services/email';
import SmsService from '../services/twilio';


class ClassOrden {
    constructor() {

    }

    async getOrderByUserId(req: Request, res:Response) {
        try {
            const user = await Login.getIdByEmail(tokenJWT.user)
            console.log(user)
            const orden: OrdenI = await api.getOrderByUserId(user);
            res.status(200).json(orden);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
            console.log(req.params.orderId)
            const orden: OrdenI = await api.getOrderById(req.params.orderId)
            res.status(200).json(orden)
        } catch(error: any) {
            res.status(400).json({error: error.message})
        }
    }

    async setOrderComplete(req: Request, res: Response) {
        try {
            const id: number|string = req.body.orderId;
            const order = await api.getOrderById(id);
            
            if (!order) {
                res.status(400).json({error: `No se encuentra la orden con el id ${id}`})
                return
            };

            if (order.estado !== 'GENERADO') {
                res.status(400).json({error: `La orden ${id} no está en estado generada`})
                return
            }

            const nuevaOrder = {
                _id: order._id,
                userId: order.userId,
                timestamp: new Date(),
                estado: "COMPLETADA",
                total: order.total,
                items: order.items
            }
            
            const ordenGuardada = await api.updateOrder(nuevaOrder);
            const mail = new EmailService()
            console.log('enviado')
            await mail.sendEmail(tokenJWT.user, `Nuevo pedido de ${tokenJWT.user}`, `${nuevaOrder}`)
            await SmsService.sendMessage(`Nuevo pedido de ${tokenJWT.user}`)

            res.status(200).json(ordenGuardada)

        } catch (error:any) {
            res.json({error: error.message});
        }
    }

    async createOrder(carrito:any){
        try {
            const order = await api.createOrder(carrito);
            
        } catch (error:any) {
            return error.message
        }
    }
}

export const Ordenes = new ClassOrden();
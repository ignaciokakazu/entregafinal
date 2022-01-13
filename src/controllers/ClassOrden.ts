import { OrdenI } from '../interfaces/orden.interfaces';
import {Request, Response} from 'express';
import { api } from '../apis/api';

class ClassOrden {
    constructor() {

    }

    async getOrderByUserId(req: Request, res:Response) {
        try {
            const orden: OrdenI = await api.getOrderByUserId(req.body.userId);
            res.json(orden);
        } catch (error: any) {
            res.json({error: error.message});
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
            const orden: OrdenI = await api.getOrderById(req.body.id)
            res.json(orden)
        } catch(error: any) {
            res.json({error: error.message})
        }
    }

    async setOrderComplete(req: Request, res: Response) {
        try {
            const id: number|string = req.body.id;
            
        } catch (error:any) {
            res.json({error: error.message});
        }
    }
}
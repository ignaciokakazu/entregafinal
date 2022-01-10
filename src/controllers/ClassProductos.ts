/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'
import {ProductoInterface,
        NewProductoInterface} from '../interfaces/productos.interfaces';
import {MensajeErrorInterface} from '../models/mensajes/mensajeError.interfaces';
import {api} from '../apis/api';
import { infoLogger } from '../services/logger';

class ClassProductos {

    async getProductosAll(req: Request, res: Response) {
        try {
            const lista = await api.getProductosAll();
            res.json(lista);
        } catch (error: any) {
            res.json({error: error.message});
        }
    }

    async getProductosByCat(req: Request, res: Response) {
        try {
            const category: string = req.params.category;
            const prod: ProductoInterface[] = await api.getProductosByCat(category);
            res.json(prod);
        } catch (error: any) {
            res.json({error: error.message})
        }
    }

    async getProductosById(req: Request, res: Response): Promise<ProductoInterface[]|MensajeErrorInterface|void> {
        try {
            const lista:ProductoInterface = await api.getProductosById(req.params.id);
            if (lista) {
                res.status(200).json(lista);
                infoLogger.info(`Se buscó ID: ${req.params.id}`)
            } else {
                res.status(200).json({error: "No se encuentra el producto"})
                infoLogger.info(`Se buscó ID: ${req.params.id} y no se encontró`)
            }
            
        } catch (error: any) {
            infoLogger.warn(`Error en la búsqueda. getProductosById (controller - productos)`)
            res.json({error: error.message});
            
        }
    }

    async insertProducto(req: Request, res: Response) {
        try {        
            const newProducto: NewProductoInterface = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                fotos: req.body.fotos,
                precio: req.body.precio,
                stock: req.body.stock,
                timestamp: new Date(),
                idCategoria: req.body.idCategoria
            }

            const respuesta = await api.insertProducto(newProducto);
            res.status(200).json(respuesta);
            
        } catch(error:any) {
            res.status(403).json({error: error.message})
        }
    }

    async deleteProducto(req:Request, res:Response) {
        // acá tengo que validar, antes de mandar
        try {
            let id:number|string;
            if (isNaN(Number(req.params.id))) {
                id = req.params.id;
            } else {
                id = Number(req.params.id);
            }
            
            await api.deleteProducto(id);
            res.status(200).json({msg: `Producto eliminado ${id} `});

        } catch(error: any) {
            res.status(403).json({error: error.message});
        }
    }

    async updateProducto(req:Request, res: Response) {

        try {
            let id:string|number = req.params.id; // tener en cuenta cuando es SQL
            
            const obj: NewProductoInterface = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                fotos: req.body.fotos,
                precio: req.body.precio,
                stock: req.body.stock,
                timestamp: new Date(),
                idCategoria: req.body.idCategoria
            }

            await api.updateProducto(id, obj);
            res.status(200).json({ msg: `Producto modificado ${id}`});

        } catch (error: any) {
            res.status(403).json({error: error.message});
        }
    }

    
    async search(req: Request, res: Response)  {
        if (req.params.search) {
            const lista = await api.search(req.params.search);
            res.status(200).json(lista);
        } else {
            const lista = await api.getProductosAll()
            res.status(200).json(lista);
        }
    }

    validacionProd(req:Request, res:Response, next: NextFunction) {
        /* middleware de validación joi */

        const joiSchema = Joi.object().keys({ 
            nombre: Joi.string().min(3).max(50).required(),
            descripcion: Joi.string().min(10).max(200).required(),
            codigo: Joi.string().min(3).max(3).required(),
            fotos: Joi.array().items(Joi.string().min(6).max(200).required()),
            precio: Joi.number().required(),
            stock: Joi.number().integer().required(),
            // no está el timestamp porque se arma con el DAO
          }); 

        try {
            const obj: any = req.body;
            
            // validacion con JOI. Está afuera de la class
            const validacionJoi = joiSchema.validate(obj);
            
            if (validacionJoi.error) {
                let textoError:string = '';
    
                validacionJoi.error.details.forEach(msg=> {
                    textoError += msg.message;
                })
    
            res.status(403).json({error: textoError});
    
            } else {
                next();
            }
        
        } catch(error:any) {
            res.status(404).json({error: error.message})
        }
    }
    
}

/*
{
    "user": {"user": "admin",
    "password": "1234"},
        "product": {"nombre": "nombre2",
    "descripcion": "descripcion2",
                "codigo": "codigo",
            "foto": "req.foto",
            "precio": 1234,
            "stock": 10}
}

*/

export const Productos = new ClassProductos();
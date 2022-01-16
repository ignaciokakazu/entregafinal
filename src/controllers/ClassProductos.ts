/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response, NextFunction } from 'express';
import Joi, { equal } from 'joi'
import {ProductoInterface,
        NewProductoInterface} from '../interfaces/productos.interfaces';
import {api} from '../apis/api';
import { infoLogger } from '../services/logger';

class ClassProductos {

    async getProductosAll(req: Request, res: Response) {
        try {
            const lista: ProductoInterface[] = await api.getProductosAll();
            if (!lista) {
                res.status(400).json({error: 'No hay productos en la base'})
                return
            } 
            
            res.status(200).json(lista);
             
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    async getProductosByCat(req: Request, res: Response) {
        try {
            const category: string = req.params.category;

            if (!category) { 
                res.status(403).json({error: 'No se recibió el id de categoría'})
                return
            }

            const prod: ProductoInterface[] = await api.getProductosByCat(category);
            res.status(200).json(prod);

        } catch (error: any) {
            res.json({error: error.message})
        }
    }

    async getProductosById(req: Request, res: Response) {
        try {
            if (!req.body.prodId) {
                res.status(403).json({error: 'No se recibió el Id de producto'})
                return
            }

            const lista:ProductoInterface = await api.getProductosById(req.body.prodId);

            if (lista) {
                infoLogger.info(`Se buscó ID: ${req.body.prodId}`)
                res.status(200).json(lista);
                return    
            } else {
                infoLogger.info(`Se buscó ID: ${req.body.prodId} y no se encontró`)
                res.status(400).json({error: "No se encuentra el producto"})
                return    
            }
            
        } catch (error: any) {
            infoLogger.warn(`Error en la búsqueda. getProductosById (controller - productos)`)
            res.json({error: error.message});
            
        }
    }

    async insertProducto(req:Request, res:Response) {
        try {        
            
            const newProducto: NewProductoInterface = req.body
            await api.insertProducto(newProducto);
            res.status(200).json(newProducto)
                        
        } catch(error:any) {
            res.status(400).json({error: error.message})
        }
    }

    async deleteProducto(req:Request, res:Response) {
        try {
            let id:number|string;
            if (isNaN(Number(req.params.id))) {
                id = req.params.id;
            } else {
                id = Number(req.params.id);
            }
            
            const mensaje = await api.deleteProducto(id);
            
            if (mensaje.deletedCount) {
                res.status(200).json({msg: 'eliminado el producto ' + id});
            } else {
                res.status(404).json({msg: 'no existe el id'});
            }
            
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
            res.status(200).json({ msg: `Producto modificado ${id}`, prod: obj});

        } catch (error: any) {
            res.status(403).json({error: error.message});
        }
    }

    
    async search(req: Request, res: Response)  {
        try {
            if (req.params.search) {
                const lista: ProductoInterface[] = await api.search(req.params.search);
                res.status(200).json(lista);
            } else {
                const lista: ProductoInterface[] = await api.getProductosAll()
                res.status(200).json(lista);
            }
        } catch(error:any) {
            res.status(400).json({error: error.message})
        }
    }

    validacionProd(req:Request, res:Response, next: NextFunction) {
        /* middleware de validación joi */

        const joiSchema = Joi.object().keys({ 
            nombre: Joi.string().min(3).max(50).required(),
            descripcion: Joi.string().min(10).max(200).required(),
            codigo: Joi.string().min(3).max(3).required(),
            idCategoria: Joi.string().min(3).max(100).required(),
            fotos: Joi.array().items(Joi.string().min(6).max(200)),
            precio: Joi.number().required(),
            stock: Joi.number().integer().required(),
            // no está el timestamp porque se arma con el DAO
          }); 

        try {
            const obj: NewProductoInterface = req.body;
            
            // validacion con JOI. Está afuera de la class
            const validacionJoi = joiSchema.validate(obj);
            
            if (validacionJoi.error) {
                let textoError:string = '';
    
                validacionJoi.error.details.forEach(msg=> {
                    textoError += msg.message;
                })
    
                res.status(400).json({error: textoError});
            
            } else {
                next();
            }
        
        } catch(error:any) {
            res.status(400).json({error: error.message})
            
        }
    }
    
}


export const Productos = new ClassProductos();
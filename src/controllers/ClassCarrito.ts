/* eslint-disable import/no-unresolved */
import {Request, Response} from 'express';
import {api} from '../apis/api';
import {CarritoI, NewCarritoI, ProdCarritoI} from '../interfaces/carrito.interfaces';
import {UserI} from '../interfaces/login.interfaces';
import {infoLogger} from '../services/logger';
import { apiLogin } from '../apis/login';
import SmsService from '../services/twilio';
import EmailService from '../services/email';
import {Login, tokenJWT} from './ClassLogin';
import { ProductoInterface } from '../interfaces/productos.interfaces';

class ClassCarrito {
    private lista:any;

    constructor() {

    }

    async setCarritoNuevo(username: string){
        const user:UserI = await apiLogin.getByEmail(username)
        const a = await api.setCarritoNuevo(user)       
    }

    async setProductoToCarrito(req:Request, res:Response) {
        try {
            const prodId: string = req.body.prodId;
            
            if (isNaN(Number(req.body.cantidad))) {
                res.status(400).json({error: 'cantidad inválida. Sólo number'})
                return
            }
            const cantidad: number = req.body.cantidad;
            const buscaProd = await api.getProductosById(prodId);

            if (!buscaProd) {
                res.status(400).json({error: `producto no existente por id ${prodId}`})
                return
            }

            const userId:UserI = await apiLogin.getByEmail(tokenJWT.user);
            const carrito = await api.getCarritoByUserId(userId._id);
 
            // hay stock suficiente?
            const producto: ProductoInterface = await api.getProductosById(prodId);

            if (producto.stock - cantidad <= 0) {
                res.status(400).json({error: `stock no es suficiente. En existencia ${producto.stock}`});
                return
            }

            const carrProd = carrito.productos.filter((prod: ProdCarritoI) =>
                prod.itemId == prodId
            );

            if (!carrito.productos.length || !carrProd.length) {
                carrito.productos.push({itemId: prodId, cantidad: cantidad, timestamp: new Date()})
                console.log('sin producto de id en el carrito antes')
                const carritoNuevo:NewCarritoI = {
                    userId: carrito.userId,
                    productos: carrito.productos,
                    timestamp: new Date(),
                    direccion: carrito.direccion
                }

                await api.updateCarrito(carritoNuevo,carrito._id.toString());
                
                res.status(200).json({msg: carrito._id, carrito: carritoNuevo})
                return
            } 
            
            const carrSinProd = carrito.productos.filter((prod: ProdCarritoI)=>prod.itemId != prodId)
            
            let cant = carrProd[0].cantidad;
            cant += cantidad;
            const productosId = carrProd[0]._id
            carrSinProd.push({itemId: prodId, cantidad: cant, timestamp: new Date(), _id: productosId})
 
            const carritoNuevo:NewCarritoI = {
                userId: carrito.userId,
                productos: carrSinProd,
                timestamp: new Date(),
                direccion: carrito.direccion
            }
 
            //actualiza carrito y producto (stock)
            console.log('con producto de id en el carrito antes')

            await api.updateCarrito(carritoNuevo, carrito._id);
            const prod = await api.updateProducto(buscaProd._id, {
                nombre: buscaProd.nombre,
                descripcion: buscaProd.descripcion,
                fotos: buscaProd.fotos,
                stock: buscaProd.stock - cantidad,
                idCategoria: buscaProd.idCategoria,
                precio: buscaProd.precio,
                timestamp: new Date()
            })
 
            res.status(200).json({msg: prodId, cantidad: cant})
 
        } catch(error:any) {
            res.status(400).json({error: 'error en setProducto ' + error.message})
        }
    }

    async deleteCarrito(req:Request, res:Response) {
        try {
            const prodId: string = req.body.prodId;
            
            if (isNaN(Number(req.body.cantidad))) {
                res.status(400).json({error: 'cantidad inválida. Sólo number'})
                return
            }

            const cantidad: number = req.body.cantidad;

            const buscaProd = await api.getProductosById(prodId);

            if (!buscaProd) {
                res.status(400).json({error: `producto no existente por id ${prodId}`})
                return
            }

            const userId:UserI = await apiLogin.getByEmail(tokenJWT.user);
            const carrito = await api.getCarritoByUserId(userId._id);
 
            // hay cantidad suficiente para borrar?
            const producto: ProductoInterface = await api.getProductosById(prodId);

            const carrProd = carrito.productos.filter((prod: ProdCarritoI) =>prod.itemId == prodId);

            if (!carrito.productos.length || !carrProd.length) {
                res.status(400).json({msg: `no existe el producto en el carrito`})
                return
            } 
            
            if (carrProd[0].cantidad - cantidad <0) {
                res.status(400).json({msg: `la cantidad del carrito es insuficiente ${carrProd[0].cantidad}`})
                return
            }

            const carrSinProd = carrito.productos.filter((prod: ProdCarritoI)=>prod.itemId != prodId)

            const productosId = carrProd[0]._id
            const cant = carrProd[0].cantidad - cantidad
            carrSinProd.push({itemId: prodId, cantidad: cant, timestamp: new Date(), _id: productosId})
 
            const carritoNuevo = {
                userId: carrito.userId,
                productos: carrSinProd,
                timestamp: new Date(),
                direccion: carrito.direccion
            }
 
            //actualiza carrito y producto (stock)
            await api.updateCarrito(carritoNuevo, carrito._id);
            const prod = await api.updateProducto(buscaProd._id, {
                nombre: buscaProd.nombre,
                descripcion: buscaProd.descripcion,
                fotos: buscaProd.fotos,
                stock: buscaProd.stock + cantidad,
                idCategoria: buscaProd.idCategoria,
                precio: buscaProd.precio,
                timestamp: new Date()
            })
 
            res.status(200).json({msg: prodId, cantidad: cant})
 
        } catch(error:any) {
            res.status(400).json({error: 'error en deleteProducto ' + error.message})
        }
    }

    async getCarritoByUsername(req:Request, res:Response) {
        try {
            if (!tokenJWT.user) {
                res.status(400).json({error: 'no se encuentra loggeado el usuario'})
                return
            }

            const user:UserI = await apiLogin.getByEmail(tokenJWT.user);
            const carrito: CarritoI = await api.getCarritoByUserId(user._id.toString());
            res.status(200).json({carrito});
        } catch(error:any) {
            res.status(403).json({error: 'error en getCarritoByUsername ' + error.message})
        }
    }

    async submit(req: Request, res:Response) {
        try {
            if (!tokenJWT.user) {
                res.status(400).json({error: 'no se encuentra loggeado el usuario'})
                return
            }

            const user:UserI = await apiLogin.getByEmail(tokenJWT.user);
            const carrito = await api.getCarritoByUserId(user._id.toString());

            if (!carrito.productos) {
                res.status(400).json({error: 'carrito vacío, no se puede cerrar la orden'})
                return
            }

            let total = 0;
            const items = [];
            for (let i=0;i<carrito.productos.length;i++) {
                const precio = await api.getProductoPrecioById(carrito.productos[i].itemId);
                total = carrito.productos[i].cantidad * precio
                // console.log(carrito.productos[i].itemId)
                // console.log(carrito.productos[i].cantidad)
                // console.log(precio)
                items.push({itemId:carrito.productos[i].itemId, 
                            cantidad: carrito.productos[i].cantidad,
                            precio: precio})
            }
            // console.log(items)
            const order = {
                userId: user._id,
                timestamp: new Date(),
                items: items,
                estado: 'GENERADO',
                total: total
            }
            // console.log(order);
            
            // borrar los productos del carrito
            // actualizar el timestamp
            await api.updateCarrito({
                userId: user._id,
                timestamp: new Date(),
                productos: [],
                direccion: carrito.direccion
            }, carrito._id);

            const orderCreada = api.createOrder(order);
            res.status(200).json({order});
        } catch(error:any) {
            res.status(403).json({error: 'error en getCarritoByUsername ' + error.message})
        }
    }


}

export const Carrito = new ClassCarrito();
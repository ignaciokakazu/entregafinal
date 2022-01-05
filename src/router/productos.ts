import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Login } from '../controllers/ClassLogin';
import {Productos} from '../controllers/ClassProductos';

const router = express.Router();
let admin=false;

/* hacer mensajes de error */

router.get('/listar', Productos.getProductosAll);

router.get('/listar/:id', Productos.getProductosById);

router.get('/search/:search', Productos.search);

router.delete('/borrar/:id', Productos.deleteProducto);

router.post('/agregar', 
            Productos.validacionProd, 
            Productos.insertProducto);

router.put('/actualizar/:id', 
            Productos.validacionProd, 
            Productos.updateProducto);

export default router;
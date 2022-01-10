import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Login } from '../controllers/ClassLogin';
import {Productos} from '../controllers/ClassProductos';

const router = express.Router();
let admin=false;

/* hacer mensajes de error */

router.get('/', Productos.getProductosAll);

/* ◦	no necesita autenticación previa
◦	listara los productos como un array de objetos
◦	cada objeto contendrá toda la información referida al productos
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del producto
 *           example: 1
 *         nombre:
 *           type: String
 *           description: nombre del producto
 *           example: Camiseta Bokita the biggest
 *         precio:
 *           type: number
 *           description: precio del producto
 *           example: 2000
 *     NewProductInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: nombre del producto
 *           example: Camiseta Bokita the biggest
 *         precio:
 *           type: number
 *           description: precio del producto
 *           example: 2000
 */

router.get('/:category', Productos.getProductosByCat);

/*◦	no necesita autenticación previa
◦	listara los productos como un array de objetos
◦	Si no existe ningún documento con la categoría pedida, devolver el array vacio
◦	cada objeto contendrá toda la información referida al productos */

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
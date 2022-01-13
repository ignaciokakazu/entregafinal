import express from 'express';
import { verifyToken } from '../middleware/jwt';
import { isAdmin } from '../middleware/middleAdmin';
import {Productos} from '../controllers/ClassProductos';

const router = express.Router();


router.get('/', Productos.getProductosAll);

router.get('/:id', Productos.getProductosById);

router.get('/search/:search', Productos.search);

router.delete('/:id', verifyToken, isAdmin, Productos.deleteProducto);

router.post('/agregar', 
            verifyToken,
            isAdmin,
            Productos.validacionProd, 
            Productos.insertProducto);

router.put('/actualizar/:id', 
            verifyToken,
            isAdmin,
            Productos.validacionProd, 
            Productos.updateProducto);

// router.get('/', Productos.getProductosAll);
// /* ◦	no necesita autenticación previa
// ◦	listara los productos como un array de objetos
// ◦	cada objeto contendrá toda la información referida al productos
// */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     ProductData:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: String
//  *           description: ID del producto
//  *           example: 1
//  *         nombre:
//  *           type: String
//  *           description: nombre del producto
//  *           example: Camiseta Bokita the biggest
//  *         precio:
//  *           type: number
//  *           description: precio del producto
//  *           example: 2000
//  *     NewProductInput:
//  *       type: object
//  *       properties:
//  *         nombre:
//  *           type: String
//  *           description: nombre del producto
//  *           example: Camiseta Bokita the biggest
//  *         precio:
//  *           type: number
//  *           description: precio del producto
//  *           example: 2000
//  */

// router.get('/:category', Productos.getProductosByCat);

// /*◦	no necesita autenticación previa
// ◦	listara los productos como un array de objetos
// ◦	Si no existe ningún documento con la categoría pedida, devolver el array vacio
// ◦	cada objeto contendrá toda la información referida al productos */

// router.get('/listar:productid', Productos.getProductosById);

// router.get('/hola', (req, res)=> {
//     res.json({hola:'hola'})
// })
// router.delete('/:productid', Productos.deleteProducto);

// router.post('/', 
//             Productos.validacionProd, 
//             Productos.insertProducto);

// router.put('/:productid', 
//             Productos.validacionProd, 
//             Productos.updateProducto);

// router.get('/search/:search', Productos.search);



export default router;
import express from 'express';
import {Carrito} from '../controllers/ClassCarrito';

const router = express.Router();

/**
 * @swagger
 * api/carrito/:
 *   get:
 *     summary: Devuelve el carrito por ID de usuario
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId: 
 *                   type: string
 *                 productos:
 *                   type: object
 *                 timestamp: 
 *                   type: date
 *                 direccion:
 *                   type: object
 *       404:
 *         description: No hay carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: String
 *                   example: No hay carritos
 *       403:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: String
 *                   example: Error
 */
router.get('/', Carrito.getCarritoById);

/**
 * @swagger
 * api/carrito/agregar/:id:
 *   get:
 *     summary: agrega un carrito con userId
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: Object 
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *       404:
 *         description: No existe el usuario con ese id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: String
 *                   example: No existe el usuario con ese id
 *
 */


router.post('/agregar', Carrito.setCarrito); 

/**
 * @swagger
 * post:
 *     summary: Agrega productos al carrito por id de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: agrega un producto nuevo al carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado con exito
 *                 data:
 *                    
 *       400:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *
 */

router.post('/checkout', Carrito.checkout);

/**
 * @swagger
 * post:
 *     summary: Agrega productos al carrito por id de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: agrega un producto nuevo al carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado con exito
 *                 data:
 *                    
 *       400:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *
 */




router.delete('/borrar/todo', Carrito.deleteCarritoById);
// async (req:Request, res:Response)=> {
//     res.json(await Carrito.deleteCarritoAll());
// })

//router.delete('/borrar/:id', Carrito.deleteCarritoById);
// async (req: Request,res:Response)=> {
//     res.json(await Carrito.deleteCarritoById(Number(req.params.id)))
// })

router.get('/', (req, res)=> {
    res.render('crud')
})

export default router;
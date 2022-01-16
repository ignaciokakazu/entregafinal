import express from 'express';
import {Carrito} from '../controllers/ClassCarrito';

const router = express.Router();

// Routes
/**
 * @swagger
 * /api/carrito/:
 *  get:
 *    summary: Devuelve el carrito del usuario
 *    parameters:
 *    - in: path
 *      name: name
 *      schema:
 *        type: string
 *      required: true
 *    request body:
 *    description: Devuelve el carrito del usuario. Necesita estar logeado
 *    responses:
 *      '200':
 *        description: Respuesta exitosa.
 *        content: 
 *          application/json:
 *            schema:
 *               type: Object 
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 productos:
 *                   type: array
 *                 timestamp:
 *                   type: date
 *                 direccion:
 *                   type: object
 *      '400':
 *        description: No se encuentra logueado el usuario.
 *        content: 
 *          application/json:
 *            schema:
 *               type: Object 
 *               example: No se encuentra logueado el usuario
 *                  
 * 
 */


/**
 * @swagger
 * /api/carrito/add:
 *  post:
 *    summary: agrega cantidades de productos al carrito del usuario
 *    request body:
 *      content:
 *        application/json:
 *          schema:
 *             type: Object
 *             properties:
 *               prodId:
 *                 type: string
 *    description: agrega cantidades de productos al carrito del usuario
 *    responses:
 *      '200':
 *        description: Respuesta exitosa.
 *        content: 
 *          application/json:
 *            schema:
 *               type: Object 
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 productos:
 *                   type: array
 *                 timestamp:
 *                   type: date
 *                 direccion:
 *                   type: object
 *      '400':
 *        description: No se encuentra logueado el usuario.
 *        content: 
 *          application/json:
 *            schema:
 *               type: Object 
 *               example: No se encuentra logueado el usuario
 *                  
 * 
 */


router.post('/add', Carrito.setProductoToCarrito); 

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

router.post('/submit', Carrito.submit);

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
router.post('/delete', Carrito.deleteCarrito);



export default router;
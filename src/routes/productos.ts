import express from 'express';
import { verifyToken } from '../middleware/jwt';
import { isAdmin } from '../middleware/middleAdmin';
import {Productos} from '../controllers/ClassProductos';

const router = express.Router();


/**
 * @swagger
 * api/productos/:
 *   get:
 *     summary: Devuelve todos los productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoI'
 *     responses:
 *       200:
 *         description: devuelve todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: 
 *                 data:
 *                    
 *       400:
 *         description: error
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

router.get('/', Productos.getProductosAll);


/**
 * @swagger
 * api/productos/:id:
 *   get:
 *     summary: Devuelve el producto por id de producto
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: Devuelve el producto por id de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: 
 *                 data:
 *                    
 *       400:
 *         description: No existe el producto con ese id
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

router.get('/:id', Productos.getProductosById);


/**
 * @swagger
 * api/productos/search/:search:
 *   get:
 *     summary: Busca productos por string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: Devuelve un array de productos que coincidan con la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: 
 *                 data:
 *                    
 *       403:
 *         description: No existe un producto para esa búsqueda
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

router.get('/search/:search', Productos.search);


/**
 * @swagger
 * api/productos/:id:
 *   delete:
 *     summary: Elimina un producto por id de producto
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: Elimina un producto por id de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: Producto de id eliminado
 *                 data:
 *                    
 *       403:
 *         description: No existe un producto con ese id para eliminar
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

router.delete('/:id', verifyToken, isAdmin, Productos.deleteProducto);


/**
 * @swagger
 * api/productos/agregar:
 *   post:
 *     summary: Ruta protegida para admin. Agrega un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: Ruta protegida para admin. Agrega un producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado
 *                 data:
 *                    
 *       403:
 *         description: Validación de campos no cumple con los requisitos
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

router.post('/agregar', 
            verifyToken,
            isAdmin,
            Productos.validacionProd, 
            Productos.insertProducto);

/**
 * @swagger
 * api/productos/actualizar/:id:
 *   put:
 *     summary: Ruta protegida para admin. Actualiza un producto por ID de producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInterface'
 *     responses:
 *       200:
 *         description: Ruta protegida para admin. Actualiza un producto por ID de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado
 *                 data:
 *                    
 *       403:
 *         description: Validación de campos no cumple con los requisitos
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

router.put('/actualizar/:id', 
            verifyToken,
            isAdmin,
            Productos.validacionProd, 
            Productos.updateProducto);


export default router;
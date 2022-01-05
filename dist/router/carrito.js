"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassCarrito_1 = require("../controllers/ClassCarrito");
const router = express_1.default.Router();
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
router.get('/listar', ClassCarrito_1.Carrito.getCarritoAll);
/**
 * @swagger
 * /listar:
 *   get:
 *     summary: Devuelve todos los carritos. Funcionalmente no tiene mucho sentido (sólo para cumplir con la consigna)
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
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
router.get('/listar/:id', ClassCarrito_1.Carrito.getCarritoById);
/**
 * @swagger
 * listar/:id:
 *   get:
 *     summary: Devuelve el carrito por ID
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
 *         description: No existe el carrito con el ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: String
 *                   example: No existe el carrito con el ID
 *
 */
/* Ejemplo de objeto del Response {
"_id": "61924f8b74ebb19a086840d0",
"producto": {
    "_id": "614a81044110e52a0702bf81",
    "nombre": "OsobucoModif",
    "descripcion": "Descripcion osobuco",
    "codigo": "Oso",
    "foto": "foto",
    "precio": 50,
    "stock": 10,
    "timestamp": "Tue Sep 21 2021 22:04:04 GMT-0300 (hora estándar de Argentina)"
}
*/
router.post('/agregar', ClassCarrito_1.Carrito.setCarrito); //acá recibe _id del usuario y ProductoInterface
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
router.post('/checkout', ClassCarrito_1.Carrito.checkout);
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
router.delete('/borrar/todo', ClassCarrito_1.Carrito.deleteCarritoById);
// async (req:Request, res:Response)=> {
//     res.json(await Carrito.deleteCarritoAll());
// })
//router.delete('/borrar/:id', Carrito.deleteCarritoById);
// async (req: Request,res:Response)=> {
//     res.json(await Carrito.deleteCarritoById(Number(req.params.id)))
// })
router.get('/', (req, res) => {
    res.render('crud');
});
exports.default = router;

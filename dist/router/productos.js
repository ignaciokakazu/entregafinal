"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassProductos_1 = require("../controllers/ClassProductos");
const router = express_1.default.Router();
let admin = false;
/* hacer mensajes de error */
router.get('/listar', ClassProductos_1.Productos.getProductosAll);
router.get('/listar/:id', ClassProductos_1.Productos.getProductosById);
router.get('/search/:search', ClassProductos_1.Productos.search);
router.delete('/borrar/:id', ClassProductos_1.Productos.deleteProducto);
router.post('/agregar', ClassProductos_1.Productos.validacionProd, ClassProductos_1.Productos.insertProducto);
router.put('/actualizar/:id', ClassProductos_1.Productos.validacionProd, ClassProductos_1.Productos.updateProducto);
exports.default = router;

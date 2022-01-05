"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
const joi_1 = __importDefault(require("joi"));
const api_1 = require("../apis/api");
const logger_1 = require("../services/logger");
class ClassProductos {
    getProductosAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lista = yield api_1.api.getProductosAll();
                res.json(lista);
            }
            catch (error) {
                res.json({ error: error.message });
            }
        });
    }
    getProductosById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lista = yield api_1.api.getProductosById(req.params.id);
                if (lista) {
                    res.status(200).json(lista);
                    logger_1.infoLogger.info(`Se buscó ID: ${req.params.id}`);
                }
                else {
                    res.status(200).json({ error: "No se encuentra el producto" });
                    logger_1.infoLogger.info(`Se buscó ID: ${req.params.id} y no se encontró`);
                }
            }
            catch (error) {
                logger_1.infoLogger.warn(`Error en la búsqueda. getProductosById (controller - productos)`);
                res.json({ error: error.message });
            }
        });
    }
    insertProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProducto = {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    foto: req.body.foto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    timestamp: new Date().toString()
                };
                const respuesta = yield api_1.api.insertProducto(newProducto);
                res.status(200).json(respuesta);
            }
            catch (error) {
                res.status(403).json({ error: error.message });
            }
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // acá tengo que validar, antes de mandar
            try {
                let id;
                if (isNaN(Number(req.params.id))) {
                    id = req.params.id;
                }
                else {
                    id = Number(req.params.id);
                }
                yield api_1.api.deleteProducto(id);
                res.status(200).json({ msg: `Producto eliminado ${id} ` });
            }
            catch (error) {
                res.status(403).json({ error: error.message });
            }
        });
    }
    updateProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id; // tener en cuenta cuando es SQL
                const obj = {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    foto: req.body.foto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    timestamp: new Date().toString()
                };
                yield api_1.api.updateProducto(id, obj);
                res.status(200).json({ msg: `Producto modificado ${id}` });
            }
            catch (error) {
                res.status(403).json({ error: error.message });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.search) {
                const lista = yield api_1.api.search(req.params.search);
                res.status(200).json(lista);
            }
            else {
                const lista = yield api_1.api.getProductosAll();
                res.status(200).json(lista);
            }
        });
    }
    validacionProd(req, res, next) {
        /* middleware de validación joi */
        const joiSchema = joi_1.default.object().keys({
            nombre: joi_1.default.string().min(3).max(50).required(),
            descripcion: joi_1.default.string().min(10).max(200).required(),
            codigo: joi_1.default.string().min(3).max(3).required(),
            foto: joi_1.default.string().min(3).max(200).required(),
            precio: joi_1.default.number().required(),
            stock: joi_1.default.number().integer().required(),
            // no está el timestamp porque se arma con el DAO
        });
        try {
            const obj = req.body;
            // validacion con JOI. Está afuera de la class
            const validacionJoi = joiSchema.validate(obj);
            if (validacionJoi.error) {
                let textoError = '';
                validacionJoi.error.details.forEach(msg => {
                    textoError += msg.message;
                });
                res.status(403).json({ error: textoError });
            }
            else {
                next();
            }
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
/*
{
    "user": {"user": "admin",
    "password": "1234"},
        "product": {"nombre": "nombre2",
    "descripcion": "descripcion2",
                "codigo": "codigo",
            "foto": "req.foto",
            "precio": 1234,
            "stock": 10}
}

*/
exports.Productos = new ClassProductos();

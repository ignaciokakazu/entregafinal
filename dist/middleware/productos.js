"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacionProd = void 0;
const joi_1 = __importDefault(require("joi"));
/* middleware de validación de productos con JOI*/
const joiSchema = joi_1.default.object().keys({
    nombre: joi_1.default.string().min(3).max(50).required(),
    descripcion: joi_1.default.string().min(10).max(200).required(),
    codigo: joi_1.default.string().min(3).max(3).required(),
    foto: joi_1.default.string().min(3).max(200).required(),
    precio: joi_1.default.number().required(),
    stock: joi_1.default.number().integer().required(),
    // no está el timestamp porque se arma con el DAO
});
const validacionProd = (req, res, next) => {
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
};
exports.validacionProd = validacionProd;

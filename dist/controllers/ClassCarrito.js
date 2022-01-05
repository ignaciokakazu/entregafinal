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
exports.Carrito = void 0;
const api_1 = require("../apis/api");
const logger_1 = require("../services/logger");
const login_1 = require("../apis/login");
const twilio_1 = __importDefault(require("../services/twilio"));
const email_1 = __importDefault(require("../services/email"));
class ClassCarrito {
    constructor() {
    }
    getCarritoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const carrito = yield api_1.api.getCarritoById(id);
                carrito ? res.status(200).json(carrito) : res.status(404).json({ error: `No hay carrito con el ID ${id}` });
            }
            catch (error) {
                logger_1.infoLogger.warn(error.message);
                res.status(403).json({ error: error.message });
            }
        });
    }
    getCarritoAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carritoAll = yield api_1.api.getCarritoAll();
                if (!carritoAll) {
                    res.status(404).json({ error: 'No hay carritos' });
                    return;
                }
                res.status(200).json(carritoAll);
            }
            catch (error) {
                res.status(403).json({ error: error.message });
            }
        });
    }
    deleteCarritoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield api_1.api.deleteCarritoById(req.body.id);
                res.json({ msg: `Eliminado ${req.body.id}` });
            }
            catch (err) {
                res.json({ error: err.message });
            }
        });
    }
    setCarritoNuevo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield api_1.api.setCarritoNuevo(id);
        });
    }
    setCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* Corroborar que haya stock */
                const carrito = yield api_1.api.setCarrito(req.body);
                res.json(carrito);
            }
            catch (e) {
                res.json({ msg: e.message });
            }
        });
    }
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                {recibe del body el carrito}
                cierra el carrito. Cambia de abierto a false
            */
            try {
                let carrito = yield api_1.api.getCarritoById(req.body._id);
                const userId = carrito.user;
                const user = yield login_1.apiLogin.get(userId);
                carrito.abierto = false;
                yield api_1.api.checkout(carrito);
                //enviar mail a admin
                const mail = new email_1.default();
                console.log('enviado');
                yield mail.sendEmail(user[0].email, `Nuevo pedido de ${user[0].name}`, `${carrito}`);
                yield twilio_1.default.sendMessage(`Nuevo pedido de ${user[0].name}`);
                res.json({ msg: 'cerrado', carrito: carrito });
            }
            catch (e) {
                res.json({ msg: e.message });
            }
            //enviar sms a admin
            //enviar sms a user
        });
    }
    addCarritoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Productos
                const id = Number(req.params.body);
                const lista = yield api_1.api.getProductosById(id);
                console.log(lista);
            }
            catch (error) {
                return { error: error.message };
            }
        });
    }
}
exports.Carrito = new ClassCarrito();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const carrito_1 = __importDefault(require("./carrito"));
const hb_1 = __importDefault(require("./hb"));
const login_1 = __importDefault(require("./login"));
const passportLocal_1 = require("../middleware/passportLocal");
const error_1 = __importDefault(require("./error"));
const mainRouter = express_1.default.Router();
mainRouter.use('/', hb_1.default);
mainRouter.use('/api/productos', productos_1.default);
mainRouter.use('/api/login', login_1.default);
mainRouter.use('/api/carrito', passportLocal_1.isLoggedIn, carrito_1.default);
mainRouter.use('*', error_1.default);
exports.default = mainRouter;

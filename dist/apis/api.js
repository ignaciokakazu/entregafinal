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
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
// import { NewProductoInterface, ProductoInterface } from '../models/interfaces';
// import { ProductQuery } from '../models/interfaces';
const productos_factory_1 = require("../models/productos/productos.factory");
const carrito_factory_1 = require("../models/carrito/carrito.factory");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = productos_factory_1.TipoPersistencia.mongodbAtlas;
class capaAPI {
    constructor() {
        this.productos = productos_factory_1.ProductosFactoryDAO.get(tipo);
        this.carrito = carrito_factory_1.CarritoFactoryDAO.get(tipo);
    }
    //PRODUCTOS
    getProductosAll() {
        return __awaiter(this, void 0, void 0, function* () {
            //if (id) return this.productos.getProductosById(id);
            return this.productos.getProductosAll();
        });
    }
    getProductosById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.getProductosById(id);
        });
    }
    insertProducto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.insertProducto(data);
        });
    }
    deleteProducto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.deleteProducto(data);
        });
    }
    updateProducto(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.updateProducto(id, data);
        });
    }
    search(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.search(data);
        });
    }
    //carrito
    getCarritoAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.getCarritoAll();
        });
    }
    getCarritoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.getCarritoById(id);
        });
    }
    addCarritoPrueba() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.addCarritoPrueba();
        });
    }
    setCarritoNuevo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.setCarritoNuevo(id);
        });
    }
    setCarrito(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //en realidad acá le debería pasar el producto. En el DAO debería hacer la lógica de Mongo, para que sea útil para otras BD
            return this.carrito.setCarrito(data);
        });
    }
    deleteCarritoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.deleteCarritoById(id);
        });
    }
    checkout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.checkout(data);
        });
    }
}
exports.api = new capaAPI();

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
exports.productosAPI = void 0;
// import { ProductQuery } from '../models/interfaces';
const productos_factory_1 = require("../models/productos/productos.factory");
const productos_factory_2 = require("../models/productos/productos.factory");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = productos_factory_2.TipoPersistencia.mongodbAtlas;
class prodAPI {
    constructor() {
        this.productos = productos_factory_1.ProductosFactoryDAO.get(tipo);
    }
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
    search(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.search(data);
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
}
exports.productosAPI = new prodAPI();

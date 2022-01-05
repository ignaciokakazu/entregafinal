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
exports.apiLogin = void 0;
const login_factory_1 = require("../models/login/login.factory");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = login_factory_1.TipoPersistencia.mongodbAtlas;
class ApiLogin {
    constructor() {
        this.user = login_factory_1.LoginFactory.get(tipo);
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            /* Registración */
            // return this.productos.insertProducto(data);
            return yield this.user.addUser(user);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            /* El Id del user es el username*/
            return yield this.user.getByEmail(email);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.getAll();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.get(id);
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.userExists(email);
        });
    }
    validatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('validate password, linea 38 api/login ' + email + " " + password);
            return yield this.user.validatePassword(email, password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findById(id);
        });
    }
}
exports.apiLogin = new ApiLogin();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosFactoryDAO = exports.TipoPersistencia = void 0;
const fileSystem_1 = require("./DAO/fileSystem");
const sqlite_1 = require("./DAO/sqlite");
const memory_1 = require("./DAO/memory");
const mySQL_1 = require("./DAO/mySQL");
const mongodb_1 = require("./DAO/mongodb");
const firebase_1 = require("./DAO/firebase");
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["fileSystem"] = "FS";
    TipoPersistencia["sqlite"] = "SQLITE";
    TipoPersistencia["memory"] = "MEM";
    TipoPersistencia["mysql"] = "MYSQL";
    TipoPersistencia["mongodbLocal"] = "MOL";
    TipoPersistencia["mongodbAtlas"] = "MOA";
    TipoPersistencia["firebase"] = "FBA";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
// el tipo de persistencia es elegido en apis/productos.ts
class ProductosFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.fileSystem:
                console.log("Soy Factory y es el FS");
                return new fileSystem_1.ProductosFSDAO();
            case TipoPersistencia.sqlite:
                console.log("Soy el factory y es sqlite");
                return new sqlite_1.ProductosSQLiteDAO();
            case TipoPersistencia.memory:
                console.log("Soy el factory y es memory");
                return new memory_1.ProductosMemoryDAO();
            case TipoPersistencia.mysql:
                console.log("Soy el factory y es mysql");
                return new mySQL_1.ProductosMYSQLDAO();
            case TipoPersistencia.mongodbLocal:
                console.log("Soy el factory y es mongo local");
                return new mongodb_1.ProductosMongoDAO(true);
            case TipoPersistencia.mongodbAtlas:
                console.log("Soy el factory y es mongo Atlas");
                return new mongodb_1.ProductosMongoDAO(false);
            case TipoPersistencia.firebase:
                console.log("Soy el factory y es firebase");
                return new firebase_1.ProductosFirebaseDAO();
        }
    }
}
exports.ProductosFactoryDAO = ProductosFactoryDAO;

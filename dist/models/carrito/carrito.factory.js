"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoFactoryDAO = exports.TipoPersistencia = void 0;
// import {CarritoFSDAO} from './DAO/carrito/fileSystem';
// import {ProductosSQLiteDAO} from './DAO/productos/sqlite';
// import { ProductosMemoryDAO } from './DAO/productos/memory';
// import { ProductosMYSQLDAO } from './DAO/productos/mySQL';
const mongodb_1 = require("./DAO/mongodb");
// import {ProductosFirebaseDAO} from './DAO/productos/firebase';
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
// el tipo de persistencia es elegido en apis.ts
class CarritoFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            // case TipoPersistencia.fileSystem:
            //     console.log("Soy Factory y es el FS");
            //     return new CarritoFSDAO();
            // case TipoPersistencia.sqlite:
            //     console.log("Soy el factory y es sqlite");
            //     return new CarritoSQLiteDAO();
            //     case TipoPersistencia.memory:
            //         console.log("Soy el factory y es memory");
            //         return new CarritoMemoryDAO();
            //     case TipoPersistencia.mysql:
            //         console.log("Soy el factory y es mysql");
            //         return new CarritoMYSQLDAO()
            //     case TipoPersistencia.mongodbLocal:
            //             console.log("Soy el factory y es mongo local");
            //             return new CarritoMongoDAO(true);
            case TipoPersistencia.mongodbAtlas:
                console.log("Soy el factory y es mongo Atlas");
                return new mongodb_1.CarritoMongoDAO(false);
            //     case TipoPersistencia.firebase:
            //             console.log("Soy el factory y es firebase");
            //             return new CarritoFirebaseDAO();
        }
    }
}
exports.CarritoFactoryDAO = CarritoFactoryDAO;

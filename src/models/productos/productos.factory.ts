import {ProductosFSDAO} from './DAO/fileSystem';
// import {ProductosSQLiteDAO} from './DAO/sqlite';
import { ProductosMemoryDAO } from './DAO/memory';
import { ProductosMYSQLDAO } from './DAO/mySQL';
import {ProductosMongoDAO} from './DAO/mongodb';
import {ProductosFirebaseDAO} from './DAO/firebase';

export enum TipoPersistencia {
    fileSystem = 'FS',
    sqlite = 'SQLITE',
    memory = 'MEM',
    mysql = 'MYSQL',
    mongodbLocal = 'MOL',
    mongodbAtlas = 'MOA',
    firebase = 'FBA'
}
// el tipo de persistencia es elegido en apis/productos.ts
export class ProductosFactoryDAO {
    static get(tipo: TipoPersistencia) {
        switch (tipo) {
            case TipoPersistencia.fileSystem:
                console.log("Soy Factory y es el FS");
                return new ProductosFSDAO();
            
            // case TipoPersistencia.sqlite:
            //     console.log("Soy el factory y es sqlite");
            //     return new ProductosSQLiteDAO();
            
            case TipoPersistencia.memory:
                console.log("Soy el factory y es memory");
                return new ProductosMemoryDAO();
            
            case TipoPersistencia.mysql:
                console.log("Soy el factory y es mysql");
                return new ProductosMYSQLDAO()
            
            case TipoPersistencia.mongodbLocal:
                    console.log("Soy el factory y es mongo local");
                    return new ProductosMongoDAO(true);
            
            case TipoPersistencia.mongodbAtlas:
                    console.log("Soy el factory y es mongo Atlas");
                    return new ProductosMongoDAO(false);

            case TipoPersistencia.firebase:
                    console.log("Soy el factory y es firebase");
                    return new ProductosFirebaseDAO();
        }
    }
}
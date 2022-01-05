// import {CarritoFSDAO} from './DAO/carrito/fileSystem';
// import {ProductosSQLiteDAO} from './DAO/productos/sqlite';
// import { ProductosMemoryDAO } from './DAO/productos/memory';
// import { ProductosMYSQLDAO } from './DAO/productos/mySQL';
import {CarritoMongoDAO} from './DAO/mongodb';
// import {ProductosFirebaseDAO} from './DAO/productos/firebase';

export enum TipoPersistencia {
    fileSystem = 'FS',
    sqlite = 'SQLITE',
    memory = 'MEM',
    mysql = 'MYSQL',
    mongodbLocal = 'MOL',
    mongodbAtlas = 'MOA',
    firebase = 'FBA'
}

// el tipo de persistencia es elegido en apis.ts

export class CarritoFactoryDAO {
    static get(tipo: TipoPersistencia) {
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
                    return new CarritoMongoDAO(false);

        //     case TipoPersistencia.firebase:
        //             console.log("Soy el factory y es firebase");
        //             return new CarritoFirebaseDAO();
        }
    }
}
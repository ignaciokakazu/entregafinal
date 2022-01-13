import {ProductosFSDAO} from './DAO/fileSystem';
import {ProductosSQLiteDAO} from './DAO/sqlite';
import { ProductosMemoryDAO } from './DAO/memory';
import { ProductosMYSQLDAO } from './DAO/mySQL';
import {ProductosMongoDAO} from './DAO/mongodb';
import {ProductosFirebaseDAO} from './DAO/firebase';
import { infoLogger } from '../../services/logger';

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
                
                return new ProductosFSDAO();
            
            case TipoPersistencia.sqlite:
                
                return new ProductosSQLiteDAO();
            
            case TipoPersistencia.memory:
                
                return new ProductosMemoryDAO();
            
            case TipoPersistencia.mysql:
                
                return new ProductosMYSQLDAO()
            
            case TipoPersistencia.mongodbLocal:
                
                    return new ProductosMongoDAO(true);
            
            case TipoPersistencia.mongodbAtlas:
                
                    return new ProductosMongoDAO(false);

            case TipoPersistencia.firebase:
                    infoLogger.log("Soy el factory y es Firebase. ProductosFireBaseDAO");
                    return new ProductosFirebaseDAO();
        }
    }
}
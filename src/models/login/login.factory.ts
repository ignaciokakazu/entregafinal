import {LoginAtlasDAO} from './DAO/mongo';
import { infoLogger } from '../../services/logger';
export enum TipoPersistencia {
    mongodbLocal = 'MOL',
    mongodbAtlas = 'MOA',
}

// el tipo de persistencia es elegido en apis/productos.ts
export class LoginFactory {
    static get(tipo: TipoPersistencia) {
        switch (tipo) {
            case TipoPersistencia.mongodbAtlas:
                infoLogger.log("Soy el factory y es mongo local. MensajesAtlasDAO");
                return new LoginAtlasDAO();
            
            /*case TipoLogin.facebook:
                console.log("Factory de Facebook");
                //return new ProductosSQLiteDAO();
            
            case TipoLogin.google:
                console.log("Factory de Google");
                //return new ProductosMemoryDAO();
            */
        }
    }
}
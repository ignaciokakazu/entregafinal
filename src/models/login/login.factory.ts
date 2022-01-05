import {LoginAtlasDAO} from './DAO/mongo';

export enum TipoPersistencia {
    mongodbLocal = 'MOL',
    mongodbAtlas = 'MOA',
}

// el tipo de persistencia es elegido en apis/productos.ts
export class LoginFactory {
    static get(tipo: TipoPersistencia) {
        switch (tipo) {
            case TipoPersistencia.mongodbAtlas:
                
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
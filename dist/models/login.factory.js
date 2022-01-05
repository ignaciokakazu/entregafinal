Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginFactory = exports.TipoPersistencia = void 0;
const mongo_1 = require('./DAO/login/mongo');

let TipoPersistencia;
(function (TipoPersistencia) {
  TipoPersistencia.mongodbLocal = 'MOL';
  TipoPersistencia.mongodbAtlas = 'MOA';
}(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {})));
// el tipo de persistencia es elegido en apis/productos.ts
class LoginFactory {
  static get(tipo) {
    switch (tipo) {
      case TipoPersistencia.mongodbAtlas:
        return new mongo_1.LoginAtlasDAO();
            /* case TipoLogin.facebook:
                console.log("Factory de Facebook");
                //return new ProductosSQLiteDAO();

            case TipoLogin.google:
                console.log("Factory de Google");
                //return new ProductosMemoryDAO();
            */
    }
  }
}
exports.LoginFactory = LoginFactory;

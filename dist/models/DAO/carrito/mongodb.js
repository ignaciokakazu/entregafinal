const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.CarritoMongoDAO = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../../config/config'));
const moment_1 = __importDefault(require('moment'));

const carritoSchema = new mongoose_1.default.Schema({
  // en el SCHEMA no va el _id... sino no podría hacer save del NewCarritoInterface
  timestamp: String,
  user: String,
  producto: [{
    _id: String,
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    cantidad: Number,
    timestramp: String,
  }],
  abierto: Boolean,
});
class CarritoMongoDAO {
  constructor(local = false) {
    if (local) { this.srv = `mongodb://localhost:27017/${config_1.default.MONGO_LOCAL_DBNAME}`; } else { this.srv = `mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`; }
    mongoose_1.default.connect(this.srv);
    this.carrito = mongoose_1.default.model('carrito', carritoSchema);
  }

  getCarritoAll() {
    return __awaiter(this, void 0, void 0, function* () {
      console.log('hola getCarrito All');
      return yield this.carrito.find();
    });
  }

  getCarritoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.carrito.findById(id).exec();
    });
  }

  setCarrito(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const id = data._id;
      const carrito = yield this.carrito.findOne({ _id: id }).exec();
      console.log(id);
      console.log(data.producto._id);
      if (!carrito) {
        return 'no se encuentra el carrito';
      }
      if (!carrito.producto.length) {
        carrito.producto.push({
          _id: data.producto._id,
          nombre: data.producto.nombre,
          descripcion: data.producto.descripcion,
          codigo: data.producto.codigo,
          foto: data.producto.foto,
          precio: data.producto.precio,
          cantidad: 1,
          timestamp: (0, moment_1.default)().format('YYYY-MM-DD-HH-mm-ss-A'),
        });
        yield this.carrito.findByIdAndUpdate(id, carrito);
        return carrito;
      }

      const productoArray = carrito.producto.filter((element) => element._id == data.producto._id);
      const cantidad = parseInt(productoArray[0].cantidad) + 1;
      console.log(productoArray);
      const carritoSinProducto = carrito.producto.filter((element) => element._id != data.producto._id);
      console.log(carritoSinProducto);
      carritoSinProducto.push({
        _id: data.producto._id,
        nombre: data.producto.nombre,
        descripcion: data.producto.descripcion,
        codigo: data.producto.codigo,
        foto: data.producto.foto,
        precio: data.producto.precio,
        cantidad,
        timestamp: (0, moment_1.default)().format('YYYY-MM-DD-HH-mm-ss-A'),
      });
      const carritoNuevo = {
        _id: carrito._id,
        user: carrito.user,
        timestamp: carrito.timestamp,
        producto: carritoSinProducto,
        abierto: true,
      };
      yield this.carrito.findByIdAndUpdate(id, carritoNuevo);
      return carritoNuevo;
    });
  }

  checkout(carrito) {
    return __awaiter(this, void 0, void 0, function* () {
      // cambia abierto a false
      try {
        const filter = { id: carrito._id };
        const update = { abierto: false };
        const doc = yield this.carrito.findOneAndUpdate(filter, update, {
          returnOriginal: false,
        });
        return doc;
      } catch (e) {
        return e.message;
      }
    });
  }

  setCarritoNuevo(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = {
        timestamp: (0, moment_1.default)().format('YYYY-MM-DD-HH-mm-ss-A'),
        user: id,
        producto: [],
        abierto: true,
      };
      try {
        const newProduct = new this.carrito(data);
        yield newProduct.save((err, data) => {
          if (err) {
            console.log('no se pudo grabar');
            throw new Error('no se pudo grabar');
          }
          console.log(data._id.toString());
        });
        return newProduct._id;
      } catch (e) {
        return e.message;
      }
    });
  }

  deleteCarritoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.carrito.deleteOne({ id });
    });
  }
}
exports.CarritoMongoDAO = CarritoMongoDAO;

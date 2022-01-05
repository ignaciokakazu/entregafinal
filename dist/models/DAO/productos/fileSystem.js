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
exports.ProductosFSDAO = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const moment_1 = __importDefault(require('moment'));

class ProductosFSDAO {
  constructor() {
    // this.urls = {
    //     carrito: "./carrito.txt",
    //     productos: "./productos.txt",
    // };
    const filePath = path_1.default.resolve(__dirname, './productos.txt');
    console.log(filePath);
    this.url = filePath;
    // Acá hay que mockear los datos y crear el archivo
  }

  getProductosAll() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!fs_1.default.existsSync(this.url)) {
          throw new Error(`El archivo ${this.url} no existe. Comuniquese con el administrador`);
        }
        const lista = yield fs_1.default.promises.readFile(this.url, 'utf-8');
        let response;
        lista ? response = JSON.parse(lista) : response = [];
        return response;
      } catch (error) {
        return { error: error.message };
      }
    });
  }

  getProductosById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const productosAll = yield this.getProductosAll();
        const productoById = productosAll.filter((prod) => prod.id == id);
        return productoById;
      } catch (error) {
        return { error: error.message };
      }
    });
  }

  write(data) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield fs_1.default.promises.writeFile(this.url, JSON.stringify(data), 'utf-8');
      } catch (error) {
        return error.message;
      }
    });
  }

  insertProducto(data) {
    return __awaiter(this, void 0, void 0, function* () {
      // lo pido sin ID. Lo averiguo acá.
      const newId = yield this.generarId();
      const productoObj = {
        id: newId,
        timestamp: (0, moment_1.default)().format('yy-MM-DD HH:mm:ss'),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      const productos = yield this.getProductosAll();
      productos.push(productoObj);
      this.write(productos);
      return productoObj;
    });
  }

  generarId() {
    return __awaiter(this, void 0, void 0, function* () {
      const productos = yield this.getProductosAll();
      const largo = productos.length;
      let max = 0;
      for (let i = 0; i < largo; i++) {
        if (parseInt(productos[i].id) > max) {
          max = parseInt(productos[i].id);
        }
      }
      return max + 1;
    });
  }

  deleteProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const productos = yield this.getProductosAll();
      const productosTemp = productos.filter((prod) => prod.id != id);
      this.write(productosTemp);
    });
  }

  updateProducto(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
      const productos = yield this.getProductosAll();
      const productosTemp = {
        id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      const productosFilter = productos.filter((prod) => prod.id == id);
      productosFilter.push(productosTemp);
      this.write(productosFilter);
    });
  }
}
exports.ProductosFSDAO = ProductosFSDAO;

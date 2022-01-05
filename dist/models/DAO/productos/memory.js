const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductosMemoryDAO = void 0;
class ProductosMemoryDAO {
  constructor() {
    this.lista = [
      {
        id: 1,
        timestamp: new Date(),
        nombre: 'Osobuco',
        descripcion: 'Descripcion osobuco',
        codigo: 'OSO',
        foto: 'https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184247/osobuco_bv6hdd.jpg',
        precio: 100,
        stock: 8,
      },
      {
        id: 2,
        timestamp: new Date(),
        nombre: 'Cebolla de verdeo',
        descripcion: 'Descripcion Cebolla verdeo',
        codigo: 'CEV',
        foto: 'https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619390363/Cebolla-de-verdeo_y3bwhi.jpg',
        precio: 12,
        stock: 10,
      },
      {
        id: 3,
        timestamp: new Date(),
        nombre: 'Cebolla morada',
        descripcion: 'Descripcion cebolla morada',
        codigo: 'CEM',
        foto: 'https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184230/verduras_szswkw.jpg',
        precio: 22,
        stock: 18,
      },
    ];
  }

  getProductosAll() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.lista;
    });
  }

  getProductosById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.lista.filter((producto) => producto.id == id);
    });
  }

  insertProducto(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const obj = {
        id: this.lista.length,
        timestamp: new Date(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      this.lista.push(obj);
      return obj;
    });
  }

  deleteProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
      this.lista.filter((producto) => producto.id != id);
      return id;
    });
  }

  updateProducto(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
      this.lista.filter((producto) => producto.id != id);
      const obj = {
        id,
        timestamp: new Date(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      this.lista.push(obj);
      return obj;
    });
  }
}
exports.ProductosMemoryDAO = ProductosMemoryDAO;

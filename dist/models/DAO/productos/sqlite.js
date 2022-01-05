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
exports.ProductosSQLiteDAO = void 0;
const knex_1 = __importDefault(require('knex'));

class ProductosSQLiteDAO {
  constructor() {
    this.sqlite = (0, knex_1.default)({
      client: 'sqlite3',
      connection: {
        filename: './ecommerce.sqlite',
        //   useNullAsDefault: false;
      },
    });
    this.lista = {
      // id:1,
      // timestamp: new Date(),
      nombre: 'Osobuco',
      descripcion: 'Descripcion osobuco',
      codigo: 'OSO',
      foto: 'https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184247/osobuco_bv6hdd.jpg',
      precio: 100,
      stock: 8,
    };
    this.sqlite.schema.hasTable('productos').then((exists) => {
      if (!exists) {
        console.log('Se crea la tabla productos');
        this.sqlite.schema.createTable('productos', (productosTable) => {
          productosTable.increments('id');
          productosTable.string('nombre').notNullable();
          productosTable.string('descripcion').notNullable();
          productosTable.string('codigo').notNullable();
          productosTable.string('foto').notNullable();
          productosTable.decimal('precio', 6, 2).notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.timestamp('timestamp').notNullable().defaultTo(new Date());
        }).then(() => {
          this.sqlite('productos').insert(this.lista);
        }).then(() => {
          console.log('done');
        });
      }
    });
  }

  getProductosAll() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sqlite.select().table('productos');
    });
  }

  getProductosById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sqlite.select().table('productos').where({ id });
    });
  }

  insertProducto(data) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sqlite('productos').insert(data);
    });
  }

  deleteProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sqlite('productos').where({ id }).del();
    });
  }

  updateProducto(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.sqlite('productos').where({ id }).update(data);
    });
  }
}
exports.ProductosSQLiteDAO = ProductosSQLiteDAO;

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
exports.ProductosMYSQLDAO = void 0;
const knex_1 = __importDefault(require('knex'));

class ProductosMYSQLDAO {
  constructor() {
    this.mySQL = (0, knex_1.default)({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'desafio17',
      },
      pool: { min: 0, max: 7 },
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
    this.mySQL.schema.hasTable('productos').then((exists) => {
      if (!exists) {
        console.log('Se crea la tabla productos');
        this.mySQL.schema.createTable('productos', (productosTable) => {
          productosTable.increments('id');
          productosTable.string('nombre').notNullable();
          productosTable.string('descripcion').notNullable();
          productosTable.string('codigo').notNullable();
          productosTable.string('foto').notNullable();
          productosTable.decimal('precio', 6, 2).notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.timestamp('timestamp').notNullable();
        }).then(() => {
          this.mySQL('productos').insert(this.lista);
        }).then(() => {
          console.log('done');
        });
      }
    });
  }

  getProductosAll() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.mySQL.select().table('productos');
    });
  }

  getProductosById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.mySQL.select().table('productos').where({ id });
    });
  }

  insertProducto(data) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.mySQL('productos').insert(data);
    });
  }

  deleteProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.mySQL('productos').where({ id }).del();
    });
  }

  updateProducto(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.mySQL('productos').where({ id }).update(data);
    });
  }
}
exports.ProductosMYSQLDAO = ProductosMYSQLDAO;

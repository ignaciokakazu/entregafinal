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
exports.LoginAtlasDAO = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../../config/config'));
const logger_1 = require('../../../services/logger');
const bcrypt_1 = __importDefault(require('bcrypt'));
/* schemas para mongoose */
const usersSchema = new mongoose_1.default.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: false,
  },
  tel: {
    type: Number,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
});
class LoginAtlasDAO {
  constructor() {
    /* hacer según un argumento de entrada */
    this.srv = config_1.default.MONGO_ATLAS_SRV;
    mongoose_1.default.connect(this.srv);
    this.mongoModel = mongoose_1.default.model('user', usersSchema);
  }

  getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
      let output; // tipo de dato de ouput es UserI y lo asigna vacío
      const user = yield this.mongoModel.find({ email }).lean().exec();
      // para que lo convierta a JSON, uso lean(), sino es una query de mongoose
      logger_1.infoLogger.info(`User log ${email}`);
      return user ? user[0] : null;
    });
  }

  get(id) {
    return __awaiter(this, void 0, void 0, function* () {
      let output = [];
      try {
        if (id) {
          const document = yield this.mongoModel.findById(id);
          if (document) { output.push(document); }
        } else {
          output = yield this.mongoModel.find();
        }
        console.log(output);
        return output;
      } catch (err) {
        return output;
      }
    });
  }

  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      let output = []; // tipo de dato de ouput es UserI y lo asigna vacío
      output = yield this.mongoModel.find({});
      return output;
    });
  }

  addUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = new this.mongoModel(data);
      logger_1.infoLogger.info(`New user ${data}`);
      yield user.save();
      return user;
    });
  }

  validatePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
      console.log('entro al validate ');
      // auth por Mongo
      try {
        // buscar en Mongo
        console.log('entro al validate try');
        console.log(email);
        console.log(password);
        const userMongo = yield this.mongoModel.find({ email }).lean().exec();
        console.log(userMongo[0].password);
        const compare = yield bcrypt_1.default.compare(password, userMongo[0].password);
        console.log('compare ');
        console.log(compare);
        if (!compare) {
          return false;
        }

        return true;
      } catch (e) {
        logger_1.infoLogger.warn(e.message);
        return false;
      }
    });
  }

  findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.mongoModel.findById(id);
    });
  }
}
exports.LoginAtlasDAO = LoginAtlasDAO;

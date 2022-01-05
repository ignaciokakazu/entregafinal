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
exports.LoginFacebook = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = __importDefault(require('../../../config/config'));
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
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
class LoginFacebook {
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
      return user ? user[0] : null;
    });
  }

  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      let output = []; // tipo de dato de ouput es UserI y lo asigna vacío
      output = yield this.mongoModel.find({});
      return output;
    });
  }

  set(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = new this.mongoModel(data);
      console.log('setUser');
      console.log(typeof user);
      yield user.save();
      return user;
    });
  }
}
exports.LoginFacebook = LoginFacebook;

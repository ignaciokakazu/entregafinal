"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const login_1 = require("../apis/login");
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../services/logger");
const joiSchema = joi_1.default.object().keys({
    name: joi_1.default.string().min(3).max(50).required(),
    username: joi_1.default.string().email().min(3).required(),
    password: joi_1.default.string().min(8).max(20).required(),
    avatar: joi_1.default.string(),
    direccion: joi_1.default.string(),
    telefono: joi_1.default.number(),
    edad: joi_1.default.number(),
});
const joiSchemaLog = joi_1.default.object().keys({
    username: joi_1.default.string().email().min(3).required(),
    password: joi_1.default.string().min(8).max(20).required()
});
class ClassLogin {
    constructor() {
        this.user = "";
        this.password = "";
        this.admin = false;
        this.saltRounds = 10;
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const passwordConfirmation = req.body.passwordConfirmation;
                const flagPassword = password === passwordConfirmation ? true : false;
                if (!flagPassword) {
                    throw new Error("Error en confirmación de password");
                }
                console.log("file" + req.body.file);
                const joiValidacion = joiSchema.validate(req.body);
                if (joiValidacion.error) {
                    let textoError = '';
                    joiValidacion.error.details.forEach(msg => {
                        textoError += msg.message;
                    });
                    res.status(403).json({ error: textoError });
                    return;
                }
                const userArr = yield login_1.apiLogin.getByEmail(req.body.email);
                bcrypt_1.default.genSalt(10, function (err, salt) {
                    bcrypt_1.default.hash(req.body.password, salt, function (err, hash) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!err) {
                                //guarda en la BD
                                yield login_1.apiLogin.addUser({
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash,
                                    avatar: req.body.avatar,
                                    direction: req.body.direction,
                                    tel: req.body.tel,
                                    age: req.body.age,
                                });
                            }
                        });
                    });
                });
                logger_1.infoLogger.info(`Usuario ${req.body.email} dado de alta ${new Date()}`);
                res.status(200).json({ msg: `Usuario ${req.body.email} dado de alta ${new Date()}`, success: true });
            }
            catch (e) {
                logger_1.infoLogger.info(`${e.message}`);
                res.json({ msg: e.message, success: false });
            }
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //auth por Mongo
            const email = req.body.email;
            const password = req.body.password;
            const joiValidacion = joiSchemaLog.validate(req.body);
            if (joiValidacion.error) {
                let textoError = '';
                joiValidacion.error.details.forEach(msg => {
                    textoError += msg.message;
                });
                res.status(403).json({ error: textoError });
                return;
            }
            // buscar en Mongo
            const userMongo = yield login_1.apiLogin.getByEmail(req.body.email);
            const validate = yield login_1.apiLogin.validatePassword(email, password);
            console.log(validate);
            if (validate) {
                res.redirect('/carrito');
                // res.json({msg: 'ok', success:true});
            }
            else {
                res.json({ msg: 'no', success: false });
            }
        });
    }
    getIdByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMongo = yield login_1.apiLogin.getByEmail(email);
            return userMongo._id;
        });
    }
}
/* */
exports.Login = new ClassLogin();

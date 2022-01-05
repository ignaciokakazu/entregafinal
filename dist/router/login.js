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
const express_1 = __importDefault(require("express"));
const ClassLogin_1 = require("../controllers/ClassLogin");
const passportLocal_1 = __importDefault(require("../middleware/passportLocal"));
const ClassCarrito_1 = require("../controllers/ClassCarrito");
const multer_1 = require("../middleware/multer");
const logger_1 = require("../services/logger");
const router = express_1.default.Router();
router.post('/register', multer_1.upload.single('avatar'), ClassLogin_1.Login.addUser);
router.get('/paso', (req, res) => {
    res.send('paso');
});
router.get('/error', (req, res) => {
    res.send('error');
});
/* mínimo a pasar por request:
{
"name": "hola",
"email": "ignaciokakazu1@gmail.com",
"password": "123456789",
"passwordConfirmation": "123456789",
"tel": ""
}
*/
router.post('/auth', (req, res, next) => {
    // passport.authenticate('login', {successRedirect: '/paso', failureRedirect: '/error'});
    passportLocal_1.default.authenticate('login', function (err, data, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                logger_1.infoLogger.info('router auth, linea 12');
                res.status(401).json({ msg: 'error', success: false });
                return next(err);
            }
            logger_1.infoLogger.info('data');
            logger_1.infoLogger.info(data);
            console.log('data');
            console.log(data);
            console.log('info');
            console.log(info);
            if (!data) {
                console.log('router auth, linea 17');
                logger_1.infoLogger.info('router auth, linea 17');
                return res.status(401).json({ msg: 'error autenticación', success: false });
            }
            logger_1.infoLogger.info('router auth, linea 20');
            const userId = yield ClassLogin_1.Login.getIdByEmail(req.body.email);
            const carritoId = yield ClassCarrito_1.Carrito.setCarritoNuevo(userId);
            const obj = {
                msg: 'ok',
                success: true,
                id: userId,
                carritoId: carritoId
            };
            res.status(200).json({ msg: obj });
        });
    })(req, res, next);
});
/* mínimo a pasar por request:
{
"email": "ignaciokakazu1@gmail.com",
"password": "123456789",
}
*/
router.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
exports.default = router;

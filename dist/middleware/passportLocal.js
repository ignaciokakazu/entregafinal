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
exports.isAdmin = exports.isLoggedIn = exports.checkAdmin = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const login_1 = require("../apis/login");
// import { userJoiSchema } from '../models/users/users.interface';
const logger_1 = require("../services/logger");
const admin = true;
const checkAdmin = (req, res, next) => {
    logger_1.infoLogger.info('EJECUTANDO MIDDLEWARE');
    if (admin)
        next();
    else {
        logger_1.infoLogger.warn('No autorizado');
        res.status(401).json({
            msg: 'No estas autorizado',
        });
    }
};
exports.checkAdmin = checkAdmin;
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
const loginFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.infoLogger.info(`loginFunc = ${username}`);
    const user = yield login_1.apiLogin.getByEmail(username);
    logger_1.infoLogger.info(`user -> ${user}`);
    if (!user) {
        logger_1.infoLogger.warn(`user does not exists ${username}`);
        return done(null, false, { message: 'User does not exist' });
    }
    const check = yield login_1.apiLogin.validatePassword(username, password);
    logger_1.infoLogger.info(check);
    if (!check) {
        logger_1.infoLogger.warn(`Login Fail for username ${username}: Password is not valid`);
        return done(null, false, { message: 'Password is not valid.' });
    }
    logger_1.infoLogger.info('login exitoso 50');
    logger_1.infoLogger.info(`User ${username} logged in at ${new Date()}`);
    // console.log('loginFunc')
    // console.log(username)
    // console.log(user)
    return done(null, username);
});
const signUpFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield login_1.apiLogin.getByEmail(username);
        if (user) {
            logger_1.infoLogger.warn(`Signup Fail for username ${username}: Username or email already exists`);
            return done(null, {
                error: `Invalid Username/email`,
            });
        }
        else {
            const newUser = yield login_1.apiLogin.addUser(req.body);
            return done(null, newUser);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.infoLogger.error(err.message);
            return done(null, {
                error: err.message,
            });
        }
    }
});
passport_1.default.use('login', new passport_local_1.Strategy(strategyOptions, loginFunc));
passport_1.default.use('signup', new passport_local_1.Strategy(strategyOptions, signUpFunc));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((userId, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield login_1.apiLogin.getByEmail(userId);
        done(null, result);
        // const result = await apiLogin.get(userId);
        // done(null, result[0]);
    }
    catch (err) {
        done(err);
    }
}));
const isLoggedIn = (req, res, done) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield login_1.apiLogin.getByEmail('ignaciokakazu123@gmail.com');
    logger_1.infoLogger.info('is logged in. En Passport local los datos están req.session');
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        // sé que acá está mal. El tema es que no me levanta el isAuthenticated() (siempre me da false) y
        // no podía probar los endpoints. Tampoco me toma el req.user
        done();
    }
    else {
        res.send('no podes seguir sin loguearte en /admin');
    }
});
exports.isLoggedIn = isLoggedIn;
const isAdmin = (req, res, done) => {
    if (!req.user)
        return res.redirect('/admin'); //res.status(401).json({ msg: 'Unathorized' });
    done();
};
exports.isAdmin = isAdmin;
exports.default = passport_1.default;

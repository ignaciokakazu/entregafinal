"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
const config_1 = __importDefault(require("../config/config"));
const passportLocal_1 = __importDefault(require("../middleware/passportLocal"));
const index_1 = __importDefault(require("../router/index"));
// import { socket } from './socket';
// import { socketProducts } from './services/socket'; //socket io
// import myServer from './services/server';
// socketProducts(io);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
/* express configuration */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)('secreto'));
/* Passport */
const StoreOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: config_1.default.MONGO_ATLAS_SRV,
    }),
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: Number(config_1.default.SESSION_COOKIE_TIMEOUT_MIN) * 60 * 1000,
    },
};
app.use((0, express_session_1.default)(StoreOptions));
app.use(passportLocal_1.default.initialize());
app.use(passportLocal_1.default.session());
// app.use((req:Request, res:Response, next:NextFunction)=> {
//   console.log('middleware de server.ts')
//   console.log(req.user);
//   infoLogger.info(`req.user=> ${JSON.stringify(req.user)}`);
//   next();
// })
/* public */
const publicPath = path_1.default.resolve(__dirname, "../../public");
app.use(express_1.default.static(publicPath));
/* Handlebars */
app.set('view engine', 'handlebars');
const layoutsPath = path_1.default.resolve(__dirname, '../../views/layouts');
const defaultPath = path_1.default.resolve(__dirname, '../../views/layouts/index.handlebars');
app.engine('handlebars', (0, express_handlebars_1.default)({
    layoutsDir: layoutsPath,
    defaultLayout: defaultPath,
}));
/* Router */
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument, { explorer: true }));
app.use(express_1.default.json());
app.use('/', index_1.default);
// const io = new Server(socket);
const myServer = new http.Server(app);
exports.default = myServer;

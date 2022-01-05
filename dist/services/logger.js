"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLogger = void 0;
const log4js_1 = __importDefault(require("log4js"));
// pasar como middleware de express;
log4js_1.default.configure({
    appenders: {
        info: { type: 'file', filename: 'info.log' },
        peligro: { type: 'file', filename: 'peligro.log' }
    },
    categories: {
        default: {
            appenders: ['info'], level: 'info'
        }
    }
});
exports.infoLogger = log4js_1.default.getLogger('info');
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

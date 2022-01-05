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
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = require("./logger");
class Twilio {
    constructor() {
        this.twilio = (0, twilio_1.default)(config_1.default.TWILIO_ACCOUNT_ID, config_1.default.TWILIO_TOKEN);
    }
    sendMessage(message, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: config_1.default.TWILIO_CELLPHONE,
                to: to || config_1.default.TWILIO_ADMIN,
            };
            // const receiver = to || config.TWILIO_ADMIN;
            yield this.twilio.messages.create(params);
            logger_1.infoLogger.info(`SMS enviado a ${params.to}`);
            // return response; 
        });
    }
}
// export const SmsService = new Twilio();
const SmsService = new Twilio();
exports.default = SmsService;

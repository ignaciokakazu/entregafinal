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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
class EmailService {
    constructor() {
        const name = config_1.default.GMAIL_NAME;
        const address = config_1.default.GMAIL_USERNAME;
        const host = config_1.default.GMAIL_HOST;
        const port = Number(config_1.default.GMAIL_PORT);
        const username = config_1.default.GMAIL_USERNAME;
        const password = config_1.default.GMAIL_PASS;
        this.owner = {
            name: name,
            address: address,
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
                user: username,
                pass: password,
            },
        });
    }
    sendEmail(dest, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.owner,
                to: dest,
                subject,
                html: content,
            };
            yield this.transporter.sendMail(mailOptions);
        });
    }
}
exports.default = EmailService;

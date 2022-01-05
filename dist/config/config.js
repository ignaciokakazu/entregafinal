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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config = {
    PORT: process.env.PORT || 8080,
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    SESSION_COOKIE_TIMEOUT_MIN: process.env.SESSION_COOKIE_TIMEOUT_MIN || '',
    //MONGO_ATLAS
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || '',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || '',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || '',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || '',
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || '',
    //MONGO_LOCAL
    MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || '',
    //FIREBASE
    FIREBASE_TYPE: process.env.FIREBASE_TYPE || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_PRIVATEKEY_ID: process.env.FIREBASE_PRIVATEKEY_ID || '',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID || '',
    FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI || '',
    FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI || '',
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || '',
    FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL || '',
    //EMAIL
    GMAIL_NAME: process.env.GMAIL_NAME || '',
    GMAIL_USERNAME: process.env.GMAIL_USERNAME || '',
    GMAIL_PASS: process.env.GMAIL_PASS || '',
    GMAIL_PORT: process.env.GMAIL_PORT || '',
    GMAIL_HOST: process.env.GMAIL_HOST || '',
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || '',
    TWILIO_TOKEN: process.env.TWILIO_TOKEN || '',
    TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '',
    TWILIO_ADMIN: process.env.TWILIO_ADMIN || ''
};
exports.default = config;

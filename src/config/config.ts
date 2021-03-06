import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  SESSION_COOKIE_TIMEOUT_MIN:process.env.SESSION_COOKIE_TIMEOUT_MIN || '',
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
  TWILIO_ACCOUNT_ID:process.env.TWILIO_ACCOUNT_ID || '',
  TWILIO_TOKEN:process.env.TWILIO_TOKEN || '',
  TWILIO_CELLPHONE:process.env.TWILIO_CELLPHONE || '',
  TWILIO_ADMIN:process.env.TWILIO_ADMIN || '',
  //JWT
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || 60 * 60 * 3,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret_key',
};

export default config;
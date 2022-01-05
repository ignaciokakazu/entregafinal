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
exports.ProductosFirebaseDAO = void 0;
const admin = __importStar(require("firebase-admin"));
const config_1 = __importDefault(require("../../../config/config"));
class ProductosFirebaseDAO {
    constructor() {
        const params = {
            type: config_1.default.FIREBASE_TYPE,
            projectId: config_1.default.FIREBASE_PROJECT_ID,
            privateKeyId: config_1.default.FIREBASE_PRIVATEKEY_ID,
            privateKey: config_1.default.FIREBASE_PRIVATE_KEY,
            clientEmail: config_1.default.FIREBASE_CLIENT_EMAIL,
            clientId: config_1.default.FIREBASE_CLIENT_ID,
            authUri: config_1.default.FIREBASE_AUTH_URI,
            tokenUri: config_1.default.FIREBASE_TOKEN_URI,
            authProviderX509CertUrl: config_1.default.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            clientC509CertUrl: config_1.default.FIREBASE_CLIENT_X509_CERT_URL
        };
        admin.initializeApp({
            credential: admin.credential.cert(params)
        });
        this.db = admin.firestore();
    }
    getProductosAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield this.db.collection('productos').get();
            const docs = resultado.docs;
            const output = docs.map((aDoc) => ({
                id: aDoc.data().id,
                nombre: aDoc.data().nombre,
                precio: aDoc.data().precio,
                stock: aDoc.data().stock,
                descripcion: aDoc.data().descripcion,
                foto: aDoc.data().foto,
                thumbnail: aDoc.data().thumbnail,
                timestamp: aDoc.data().timestamp
            }));
            return output;
        });
    }
    getProductosById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = yield this.db.collection('productos').where('id', '==', id).get();
            let producto;
            docs.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
                producto = doc.data();
            });
            console.log(producto);
            if (docs.empty) {
                return ({ error: `No hay documentos de id ${id}` });
            }
            else {
                return (producto);
            }
        });
    }
    search(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    insertProducto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let size = 0;
            let id = 0;
            this.db.collection('productos').get().then((snap) => {
                id = snap.length;
                console.log(id);
                id = snap.size;
                console.log(id);
            });
            console.log(id);
            const obj = {
                id: id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: data.precio,
                stock: data.stock,
                timestamp: new Date()
            };
            // console.log(id);
            const userDocument = this.db.collection('productos').doc();
            yield userDocument.create(obj);
            return obj;
        });
    }
    updateProducto(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.productos.findByIdAndUpdate(id, newProductData);
            // const miDoc = this.db.collection('productos').doc(id);
            // return this.productos.findOneAndUpdate(filter, newProductData);
            return id;
        });
    }
    deleteProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //   const filter = {id:id}
            // await this.productos.deleteOne(filter);
            return id;
        });
    }
}
exports.ProductosFirebaseDAO = ProductosFirebaseDAO;

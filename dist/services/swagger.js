"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Proyecto de Cristian con Swagger',
            version: '0.0.1',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Cristian',
                url: 'https://logrocket.com',
                email: 'cristiancinetto@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['src/router/*'],
};
// const options = {
//     swaggerDefinition: {
//         openapi: "3.0.0",
//         info: {
//             version: "1.0.0",
//             title: "Documentación de API",
//             description: "API Documentación para uso",
//             contact: {
//                 name: "Ignacio Kakazu",
//                 url: "Alguna URL"
//             },
//             servers: [
//                 {
//                     url: "http://localhost:8080/api",
//                     description: "Development "
//                 },
//             ],
//         }
//     },
//     basepath: "/api",
//     apis: ["../router/*.js"]
//   }
exports.swaggerDocument = (0, swagger_jsdoc_1.default)(options);

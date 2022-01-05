"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleAdmin = void 0;
let admin = false;
const middleAdmin = (req, res, next) => {
    console.log("middleware admin");
    console.log(admin);
    admin ? next() : res.status(403).json({ error: "Error de autenticación" });
};
exports.middleAdmin = middleAdmin;

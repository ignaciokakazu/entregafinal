"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const minimist_1 = __importDefault(require("minimist"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./services/logger");
const server_1 = __importDefault(require("./services/server"));
const PORT = process.env.PORT || config_1.default.PORT;
/* FORK O CLUSTER */
const argv = (0, minimist_1.default)(process.argv.slice(2));
const modo = argv.server;
// export const PORT = argv.puerto || 8080;
logger_1.infoLogger.info(modo);
// myServer.listen(PORT, ()=> console.log(`server up ${PORT}`));
if (modo === 'FORK') {
    server_1.default.listen(PORT, () => logger_1.infoLogger.info(`Server Up port modo fork ${PORT}`));
    logger_1.infoLogger.info(process.pid);
    process.on('exit', (code) => {
        logger_1.infoLogger.info(`Código de salida: ${code}`);
    });
}
else {
    if (cluster_1.default.isMaster && cluster_1.default.isPrimary) {
        const numCPU = os_1.default.cpus().length;
        logger_1.infoLogger.info(`NÚMERO DE CPUS => ${numCPU}`);
        logger_1.infoLogger.info(`PID MASTER => ${process.pid}`);
        for (let i = 0; i < numCPU; i += 1) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker) => {
            logger_1.infoLogger.info(`Worker ${worker.process.pid} died at ${new Date()}`);
            cluster_1.default.fork();
        });
    }
    server_1.default.listen(PORT, () => logger_1.infoLogger.info(`Server Up port modo cluster ${PORT} - PID WORKER ${process.pid}`));
}

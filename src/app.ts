import os from 'os';
import cluster from 'cluster';
import minimist from 'minimist';
import config from './config/config';
import { infoLogger } from './services/logger';
import myServer from './services/server';
import { socket } from './services/socket';
import { Server } from 'socket.io';

const PORT = process.env.PORT || config.PORT;

/* websocket */
const io = new Server(myServer);
socket(io);

/* FORK O CLUSTER */
const argv = minimist(process.argv.slice(2));
const modo = argv.server;

infoLogger.info(modo);

// myServer.listen(PORT, ()=> console.log(`server up ${PORT}`));
if (modo === 'FORK') {
    myServer.listen(PORT, () => infoLogger.info(`Server Up port modo fork ${PORT}`));

    infoLogger.info(process.pid);
    process.on('exit', (code)=> {
        infoLogger.info(`Código de salida: ${code}`);
    })
} else {
    if (cluster.isMaster && cluster.isPrimary) {
        const numCPU = 2//process.env.WEB_CONCURRENCY || 1; //os.cpus().length
        infoLogger.info(`NÚMERO DE CPUS => ${numCPU}`);
        infoLogger.info(`PID MASTER => ${process.pid}`);

        for (let i=0;i<numCPU;i+=1) {
            cluster.fork();
        }

        cluster.on('exit', (worker)=> {
            infoLogger.info(`Worker ${worker.process.pid} died at ${new Date()}`);
            cluster.fork();
        })
    }

        myServer.listen(PORT, () => infoLogger.info(`Server Up port modo cluster ${PORT} - PID WORKER ${process.pid}`));
    
}
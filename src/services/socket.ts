import * as socketIo from 'socket.io';
// import classChat from '../models/classChat';
import { infoLogger } from './logger';
import {Chat} from '../controllers/ClassChat';

export const socket = (io: any) => {
    //instancia el chat
    // const chat:any = new classChat();
    //  (async () => {
    //  await chat.setChat()
    //  })();

    io.on('connection', (socket:any) => {
      infoLogger.info('Nueva Conexion establecida!');
 
      /*  CHAT */
      
      socket.on('new-mensaje', async (data:any) => {
        const msg = await Chat.sendMsg(data);

        io.emit('resp-mensaje', msg);
      });
  });

  return io;
}





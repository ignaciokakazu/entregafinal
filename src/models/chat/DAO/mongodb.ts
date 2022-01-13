import mongoose from 'mongoose';
import {CarritoInterface, NewCarritoInterface} from '../../../interfaces/carrito.interfaces';
import Config from '../../../config/config';
import Moment from 'moment';
import { ProductoInterface } from '../../../interfaces/productos.interfaces';
import {infoLogger} from '../../../services/logger';
import {MensajesI} from '../../../interfaces/mensajes.interfaces';

const mensajesSchema = new mongoose.Schema<MensajesI>({
  //en el SCHEMA no va el _id... sino no podría hacer save del NewCarritoInterface
  userId: String,
  tipo: Boolean, // 0 para sistema, 1 para usuario
  mensaje: [{
    type:Object
  }]
});


export class MensajesAtlasDAO {//implements ProductBaseClass {
  private srv: string;
  private mensajes;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.mensajes = mongoose.model<MensajesI>('mensajes', mensajesSchema);
  }

  async setMensajes(data:MensajesI) {
    // save MensajesI
    const newProduct = new this.mensajes(data);
    await newProduct.save();
    
  }
    
}

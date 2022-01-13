import mongoose from 'mongoose';
import {
  OrdenI
} from '../../../interfaces/orden.interfaces';
import Config from '../../../config/config';

export const ordenSchema = new mongoose.Schema<OrdenI>({
  userId: String,
  items: {
    itemId: String,
    cantidad: Number,
    precio: Number
  },
  timestamp: Date,
  estado: String, 
  total: Number
})


export class OrdersMongoDAO {//implements ProductBaseClass {
  private srv: string;
  private orders;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.orders = mongoose.model<OrdenI>('orden', ordenSchema);
  }

  async getOrdersById(id:string) {
    return await this.orders.findById(id).exec();
  }

  async getOrdersByUserId(userId: string): Promise<OrdenI[]> {
    return await this.orders.find({userId: userId});
  }

  async setOrderComplete(id: string) {
    const resultado = await this.orders.findById(id).exec();
    if (!resultado) { 
      return 'No se encuentra la orden. Error 400'
    } else if (resultado.estado) {
      return 'La orden no se encuentra generada. Error 400'
    } else {
      console.log('ahora modifico la orden a completada')
      console.log('enviar un email al usuario')
      return 'modificado'
    }
  }

}
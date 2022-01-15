import mongoose from 'mongoose';
import {
  OrdenI
} from '../../../interfaces/orden.interfaces';
import Config from '../../../config/config';

export const ordenSchema = new mongoose.Schema<OrdenI>({
  userId: {
    type: String,
    required: true
  },
  items: [{
    itemId: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type:Number,
      required: true
    }
  }],
  timestamp: {
    type: Date,
    required: true
  },
  estado: {
    type: String, 
    required: true
  },
  total: {
    type: Number,
    required: true
  }
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

  async getOrderById(id:string) {
    return await this.orders.findById(id).exec();
  }

  async getOrderByUserId(userId: string): Promise<OrdenI[]> {
    return await this.orders.find({userId: userId});
  }

  async updateOrder(order:any) {
    return await this.orders.findByIdAndUpdate(order._id, order)
  }

  async setOrderComplete(id: string) {
    const resultado = await this.orders.findById(id).exec();
    if (!resultado) { 
      return 'No se encuentra la orden. Error 400'
    } else if (resultado.estado) {
      return 'La orden no se encuentra generada. Error 400'
    } else {
      return 'modificado'
    }
  }

  async createOrder(data:any) {
    const newProduct = new this.orders(data);
    await newProduct.save();
    return newProduct;
  }

}
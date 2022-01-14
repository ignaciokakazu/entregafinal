import mongoose from 'mongoose';
// import {CarritoInterface, NewCarritoInterface} from '../../../interfaces/carrito.interfaces';
import Config from '../../../config/config';
import Moment from 'moment';
import { ProductoInterface } from '../../../interfaces/productos.interfaces';
import {infoLogger} from '../../../services/logger';
import {CarritoI, NewCarritoI} from '../../../interfaces/carrito.interfaces'
import { api } from '../../../apis/api';
import { apiLogin } from '../../../apis/login';
import {UserI} from '../../../interfaces/login.interfaces';
const carritoSchema = new mongoose.Schema<CarritoI>({
  //en el SCHEMA no va el _id... sino no podría hacer save del NewCarritoInterface
    userId: String,
    productos: [{
      itemId: String,
      cantidad: Number,
      timestamp: Date
    }], 
    timestamp: String,
    direccion: {
      calle: String,
      altura: Number,
      codigoPostal: String,
      piso: {type: Number, required: false, default: 0},
      departamento: {type: Number, required: false, default: ''}
    }
});

// const carritoSchema = new mongoose.Schema<CarritoInterface>({
//   //en el SCHEMA no va el _id... sino no podría hacer save del NewCarritoInterface
//     timestamp: String,
//     user: String,
//     producto: [{
//         _id: String,
//         nombre: String,
//         descripcion: String,
//         codigo: String,
//         foto: String,
//         precio: Number,
//         cantidad: Number,
//         timestramp: String
//     }],
//     abierto:Boolean
// });


export class CarritoMongoDAO {//implements ProductBaseClass {
  private srv: string;
  private carrito;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.carrito = mongoose.model<CarritoI>('carrito', carritoSchema);
  }

  async getCarritoByUserId(id:string) {
    return await this.carrito.findOne({userId: id}).exec();
  }

  async updateCarrito(carrito:any) {
    console.log(carrito)
    return await this.carrito.findOneAndReplace({_id: carrito._id}, carrito)
  }

  async setCarrito(userId:any){
    /* rehacer */
    const id:string = userId
    const carrito = await this.carrito.findOne({_id: id}).exec();
    if (!carrito) {
      return 'no se encuentra el carrito'
    }
   
  }

    async checkout(carrito: any) {
      //cambia abierto a false
      try {
      const filter = {id: carrito._id};
      const update = {abierto:false};
      
      let doc = await this.carrito.findOneAndUpdate(filter, update, {
        returnOriginal: false
      });

        return doc

      } catch(e:any) {
        return e.message;
      }
    }

    async setCarritoNuevo(user:UserI){
      try {
        const data: NewCarritoI = {
          timestamp: new Date(),
          userId: user._id.toString(),
          productos: [],
          direccion: user.direccion
      }

      const newProduct = new this.carrito(data);
      
      await newProduct.save(function(err:any,data){
          if (err) {
              infoLogger.log('no se pudo grabar')
              throw new Error('no se pudo grabar')
          } 
          
          console.log(data._id.toString());
          
      });

      return newProduct._id
    
    } catch (error:any) {
      return {error: 'error en la creación del carrito ' + error.message}
    }

  }

  async deleteCarritoById(id:string) {
      await this.carrito.deleteOne({id:id});
  }

}
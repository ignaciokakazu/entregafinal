import mongoose from 'mongoose';
// import {CarritoInterface, NewCarritoInterface} from '../../../interfaces/carrito.interfaces';
import Config from '../../../config/config';
import Moment from 'moment';
import { ProductoInterface } from '../../../interfaces/productos.interfaces';
import {infoLogger} from '../../../services/logger';
import {CarritoI, ProdCarritoI, DireccionI} from '../../../interfaces/carrito.interfaces'

// export interface CarritoI {
//   userId: string,
//   productos: [ProdCarritoI],
//   timestampCreacion: Date, // fecha de creación y update
//   direccion: DireccionI
// }

// export interface ProdCarritoI {
//   id: string,
//   cantidad: number,
//   timestamp: Date
// }

// export interface DireccionI {
//   calle: string,
//   altura: string,
//   codigoPostal: string,
//   piso?: number,
//   departamento?: number
// }

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
      altura: String,
      codigoPostal: String,
      piso: Number,
      departamento: Number
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

  async getCarritoAll() {
      console.log('hola getCarrito All')
    return await this.carrito.find();
  }

  async getCarritoById(id:string) {
    return await this.carrito.findById(id).exec();
  }

  async setCarrito(data:any){
    /* rehacer */
    const id:string = data._id
    const carrito = await this.carrito.findOne({_id: id}).exec();
    console.log(id)
    console.log(data.productos)
    if (!carrito) {
      return 'no se encuentra el carrito'
    }

        // if (!carrito.productos) {
        
        //   // userId: String,
        //   // productos: [{
        //   //   itemId: String,
        //   //   cantidad: Number,
        //   //   timestamp: Date
        //   // }], 
        //   // timestamp: String,
        //   // direccion: {
        //   //   calle: String,
        //   //   altura: String,
        //   //   codigoPostal: String,
        //   //   piso: Number,
        //   //   departamento: Number
        //   // }

        // carrito.productos.push({
        //     _id: data.producto._id,
        //     nombre: data.producto.nombre,
        //     descripcion: data.producto.descripcion,
        //     codigo: data.producto.codigo,
        //     foto: data.producto.foto,
        //     precio: data.producto.precio,
        //     cantidad: 1,
        //     timestamp: new Date(),
        // })
        
        // await this.carrito.findByIdAndUpdate(id, carrito)

        return 'hola'

    // } else {

    //   const productoArray:any = carrito.productos.filter((element:any)=> element._id == data.producto._id)
    //   const cantidad: number = parseInt(productoArray[0].cantidad) + 1;
    //   console.log(productoArray);
    //   const carritoSinProducto = carrito.productos.filter((element:any)=> element._id != data.producto._id)

    //   console.log(carritoSinProducto)
    //   carritoSinProducto.push({
    //         _id: data.producto._id,
    //         nombre: data.producto.nombre,
    //         descripcion: data.producto.descripcion,
    //         codigo: data.producto.codigo,
    //         foto: data.producto.foto,
    //         precio: data.producto.precio,
    //         cantidad: cantidad,
    //         timestamp: Moment().format('YYYY-MM-DD-HH-mm-ss-A')
    //     })
      
    //   const carritoNuevo = {
    //     _id: carrito._id,
    //     user: carrito.user,
    //     timestamp: carrito.timestamp,
    //     producto: carritoSinProducto,
    //     abierto: true
    //   }
    //     await this.carrito.findByIdAndUpdate(id, carritoNuevo)
        
    //     return carritoNuevo
    // }
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

    async setCarritoNuevo(id:string){
    //   const data: NewCarritoInterface = {
    //     timestamp: Moment().format('YYYY-MM-DD-HH-mm-ss-A'),
    //     user: id,
    //     producto: [],
    //     abierto:true
    // }
    // try {
    //   const newProduct = new this.carrito(data);
      
    //   await newProduct.save(function(err:any,data){
    //       if (err) {
    //           console.log('no se pudo grabar')
    //           throw new Error('no se pudo grabar')
    //       } 
          
    //       console.log(data._id.toString());
          
    //   });

    //   return newProduct._id

    // } catch (e:any) {
    //   return e.message
    //  }
    }

  async deleteCarritoById(id:string) {
      await this.carrito.deleteOne({id:id});
  }

}
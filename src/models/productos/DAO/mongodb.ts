import mongoose from 'mongoose';
import {
  NewProductoInterface,
  ProductoInterface,
//   ProductBaseClass,
//   ProductQuery,
} from '../../../interfaces/productos.interfaces';
import Config from '../../../config/config';
import escapeStringRegexp from 'escape-string-regexp';


export const productsSchema = new mongoose.Schema<ProductoInterface>({
//   nombre: String,
//   precio: Number,
  //_id: String, NOTA: no hace falta el _id en el Schema. No funciona el findById()
  nombre: String,
  descripcion: String,
  codigo: String,
  fotos: [String],
  precio: Number,
  stock: Number,
  timestamp: String
});

export class ProductosMongoDAO {//implements ProductBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.productos = mongoose.model<ProductoInterface>('producto', productsSchema);
  }

  async getProductosAll() {
    return await this.productos.find();
  }

  async getProductosByCat(cat: string) {
    return await this.productos.find({categoria: cat});
    
  }
  async getProductosById(id:string) {
    return await this.productos.findById(id).exec();
  }

  async insertProducto(data: NewProductoInterface) {
    const count = await this.productos.count();

    const newProduct = new this.productos(data);
    await newProduct.save();
    return newProduct;
  }

  async updateProducto(id: number|string, newProductData: any) {

    const filter = {id: id}
    
    return this.productos.findOneAndUpdate(filter, newProductData);
  }

  async deleteProducto(id: string) {
    const filter = {_id:id}
   
    const mensaje = await this.productos.deleteOne(filter)
    console.log(mensaje)
    return mensaje
    // const mensaje = await this.productos.deleteOne(filter , (err:any, d:any) => {
    //   if (err) { return "Error" }
    //     if (d.acknowledged && d.deletedCount == 1) {
    //       return "Deleted Successfully"
    //   } else {
    //       return "Record doesn't exist or already deleted"   
    //   }

    // });
    // console.log(mensaje)
    // return mensaje;
  }

  async search(data:string) {
    const regex = new RegExp(data, 'i'); //i es case insensitive
    return this.productos.find({nombre: {"$regex": regex}});
  }
}
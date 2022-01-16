import mongoose from 'mongoose';
import {
  NewProductoInterface,
  ProductoInterface,
} from '../../../interfaces/productos.interfaces';
import Config from '../../../config/config';


export const productsSchema = new mongoose.Schema<ProductoInterface>({
//   nombre: String,
//   precio: Number,
  //_id: String, NOTA: no hace falta el _id en el Schema. No funciona el findById()
  nombre: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  descripcion: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  codigo: {
    type: String,
    required: true,
    min: 3,
    max: 4
  },
  fotos: [String],
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date
  },
  idCategoria: {
    type: String,
    required:true
  }
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
    return await this.productos.find({idCategoria: cat});
    
  }
  async getProductosById(id:string) {
    return await this.productos.findById(id).exec();
  }

  async insertProducto(data: NewProductoInterface) {
    const newProduct = new this.productos(data);
    await newProduct.save();
    return newProduct;
  }

  async updateProducto(id: number|string, newProductData: any) {

    const filter = {id: id}
    
    return this.productos.findOneAndUpdate(filter, newProductData);
  }

  async getProductoPrecioById(id:number|string) {
    const filter = {id: id}
    const producto = await this.productos.findOne(filter);
    const precio = producto? producto.precio : 0
    return precio;
  }
  async deleteProducto(id: string) {
    const filter = {_id:id}
   
    const mensaje = await this.productos.deleteOne(filter)
    console.log(mensaje)
    return mensaje

  }

  async search(data:string) {
    const regex = new RegExp(data, 'i'); //i es case insensitive
    return this.productos.find({nombre: {"$regex": regex}});
  }
}
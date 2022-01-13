// import { NewProductoInterface, ProductoInterface } from '../models/interfaces';
// import { ProductQuery } from '../models/interfaces';
import {ProductosFactoryDAO, TipoPersistencia} from '../models/productos/productos.factory';
import {CarritoFactoryDAO} from '../models/carrito/carrito.factory';
import {ProductoInterface, NewProductoInterface} from '../interfaces/productos.interfaces';
import {OrderFactoryDAO} from '../models/order/order.factory';
import {NewCarritoInterface, CarritoInterface} from '../interfaces/carrito.interfaces';
import { MensajesFactoryDAO } from '../models/chat/chat.factory';
/**
 * Con esta variable elegimos el tipo de persistencia
 */
// const tipo = TipoPersistencia.sqlite;
const tipo = TipoPersistencia.mongodbAtlas;

class capaAPI { //incluye productos y carrito
  private productos: any;
  private carrito: any;
  private order: any;
  private mensajes: any;

  constructor() {
    this.productos = ProductosFactoryDAO.get(tipo);
    this.carrito = CarritoFactoryDAO.get(tipo);
    this.order = OrderFactoryDAO.get(tipo);
    this.mensajes = MensajesFactoryDAO.get(tipo);
  }

  //PRODUCTOS
  async getProductosAll(): Promise<ProductoInterface[]>{//id: string | undefined = undefined){//: Promise<ProductI[]> {
    //if (id) return this.productos.getProductosById(id);

    return this.productos.getProductosAll();
  }

  async getProductosById(id:string|number): Promise<ProductoInterface> {
      return this.productos.getProductosById(id);
  }

  async insertProducto(data:NewProductoInterface) {
      return this.productos.insertProducto(data);
  }

  async deleteProducto(data:string|number) {
    return this.productos.deleteProducto(data);
   }

   async updateProducto(id:number|string, data:any) {
    return this.productos.updateProducto(id, data);
   }
   
   async search(data:string): Promise<ProductoInterface[]> {
     return this.productos.search(data);
   }

   async getProductosByCat(data: string) {
     return this.productos.getProductosByCat(data);
   }

   //carrito

   async getCarritoAll() {
       return this.carrito.getCarritoAll();
   }
   
   async getCarritoById(id:string|number) {
    return this.carrito.getCarritoById(id);
   }

   async addCarritoPrueba() {
     return this.carrito.addCarritoPrueba();
   }


   async setCarritoNuevo(id:string|number) {
    return this.carrito.setCarritoNuevo(id);
  }

  async setCarrito(data:CarritoInterface) { 
    //en realidad acá le debería pasar el producto. En el DAO debería hacer la lógica de Mongo, para que sea útil para otras BD
    return this.carrito.setCarrito(data);
  }

   async deleteCarritoById(id:number) {
    return this.carrito.deleteCarritoById(id);
   }

   async checkout(data:CarritoInterface) {
     return this.carrito.checkout(data);
   }


   //orders

   async getOrderByUserId(id:string|number) {
    return this.order.getOrderByUserId(id);
   }

   async getOrderById(userId:string|number) {
    return this.order.getOrderById(userId);
  }

  async orderComplete(id:string|number) {
    return this.order.completeOrder(id);
  }

  //chat
  async setMensajes(data:any) {
    return this.mensajes.setMensajes(data);
  }
}

export const api = new capaAPI();
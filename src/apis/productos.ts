// import { NewProductoInterface, ProductoInterface } from '../models/productos/productos.interfaces';
// // import { ProductQuery } from '../models/interfaces';
// import { ProductosFactoryDAO } from '../models/productos/productos.factory';
// import { TipoPersistencia } from '../models/productos/productos.factory';


// /**
//  * Con esta variable elegimos el tipo de persistencia
//  */
// // const tipo = TipoPersistencia.sqlite;
// const tipo = TipoPersistencia.mongodbAtlas;

// class prodAPI {
//   private productos;

//   constructor() {
//     this.productos = ProductosFactoryDAO.get(tipo);
//   }

//   async getProductosAll(): Promise<ProductoInterface[]|any>{//id: string | undefined = undefined){//: Promise<ProductI[]> {
//     //if (id) return this.productos.getProductosById(id);

//     return await this.productos.getProductosAll();
//   }

//   async getProductosById(id:any):Promise<any> {
//         return this.productos.getProductosById(id);
//   }

//   async insertProducto(data:any):Promise<any> {
//       return this.productos.insertProducto(data);
//   }

//   async search(data:string):Promise<any> {
//     return this.productos.search(data);
//   }

//   async deleteProducto(data:any):Promise<any> {
//     return this.productos.deleteProducto(data);
//    }

//    async updateProducto(id:number, data:any):Promise<any> {
//     return this.productos.updateProducto(id, data);
//    }
// }

// export const productosAPI = new prodAPI();
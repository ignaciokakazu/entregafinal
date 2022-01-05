import * as admin from 'firebase-admin';
import { NewProductoInterface } from '../productos.interfaces';
import Config from '../../../config/config';

export class ProductosFirebaseDAO {//implements ProductBaseClass {
  db: any;

  constructor() {

    const params = {
        type: Config.FIREBASE_TYPE,
        projectId: Config.FIREBASE_PROJECT_ID,
        privateKeyId: Config.FIREBASE_PRIVATEKEY_ID,
        privateKey: Config.FIREBASE_PRIVATE_KEY,
        clientEmail: Config.FIREBASE_CLIENT_EMAIL,
        clientId: Config.FIREBASE_CLIENT_ID,
        authUri: Config.FIREBASE_AUTH_URI,
        tokenUri: Config.FIREBASE_TOKEN_URI,
        authProviderX509CertUrl: Config.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        clientC509CertUrl: Config.FIREBASE_CLIENT_X509_CERT_URL
      }

    admin.initializeApp({
        credential: admin.credential.cert(params)
    });
    this.db = admin.firestore();
  }

  async getProductosAll() {
    const resultado:any = await this.db.collection('productos').get();
    const docs:any = resultado.docs;
    const output:any = docs.map((aDoc:any) => ({
        id: aDoc.data().id,
        nombre: aDoc.data().nombre,
        precio: aDoc.data().precio,
        stock: aDoc.data().stock,
        descripcion: aDoc.data().descripcion,
        foto: aDoc.data().foto,
        thumbnail: aDoc.data().thumbnail,
        timestamp: aDoc.data().timestamp
    }))
    
    return output;
  }

  async getProductosById(id:any) {
    const docs:any = await this.db.collection('productos').where('id', '==', id).get();
    let producto:any;

    docs.forEach((doc:any) => {
      // console.log(doc.id, ' => ', doc.data());
      producto = doc.data();
    });
    console.log(producto);
    if (docs.empty) {
      return ({error: `No hay documentos de id ${id}`});
    } else {
      return (producto);
    }
  
  }

  async search(data:string) {
    return []
  }
  
  async insertProducto(data: any) {
    let size:number = 0;
    let id:number = 0;

    this.db.collection('productos').get().then((snap:any) => {
        id = snap.length
        console.log(id)
        id = snap.size
        console.log(id)
      });
      console.log(id);
      const obj = {
        id: id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
        timestamp: new Date()
    }    
    
    // console.log(id);
    const userDocument:any = this.db.collection('productos').doc();
    await userDocument.create(obj);
    
    return obj;
  }

  async updateProducto(id: number, newProductData: NewProductoInterface) {
    //return this.productos.findByIdAndUpdate(id, newProductData);
    // const miDoc = this.db.collection('productos').doc(id);
    // return this.productos.findOneAndUpdate(filter, newProductData);
    return id;
  }

  async deleteProducto(id: number) {
    //   const filter = {id:id}
    // await this.productos.deleteOne(filter);
    return id;
  }

//   async query(options: ProductQuery): Promise<ProductI[]> {
//     let query: ProductQuery = {};

//     if (options.nombre) query.nombre = options.nombre;

//     if (options.precio) query.precio = options.precio;

//     return this.productos.find(query);
//   }
}
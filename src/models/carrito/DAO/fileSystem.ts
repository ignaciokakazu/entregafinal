// import fs from 'fs';
// import path from 'path';
// import moment from 'moment';
// import { CarritoInterface, CarritoArray } from '../../carrito.interfaces';

// export class CarritoFSDAO {
//     url:string;
//     carrito:[];

//     constructor () {
//         console.log(path.resolve(__dirname, './carrito.txt'));
//         const filePath = path.resolve(__dirname, './carrito.txt');
//         this.url = filePath;
//         this.carrito = [];
//     }

//     async getCarritoAll(): Promise<CarritoArray|string> {
//         try {
//             if (!fs.existsSync(this.url)) {throw new Error (`El archivo ${this.url} no existe. Comuniquese con el administrador`)} 
//             const lista = await fs.promises.readFile(this.url, 'utf-8');
//             let response: any;
//             lista? response = JSON.parse(lista) : response = [];
//             return response;
//         } catch(e) {
//             return e.message;
//         }
        
//     }

//     async getCarritoById(id:number|string): Promise<CarritoArray|Object> {
//         try {
//             let idNumber: number;
            
//             if (typeof id === 'string') {
//                 idNumber = parseInt(id);
//             }

//             const carritoAll:CarritoArray = await this.getCarritoAll();
//             const carritoById:CarritoArray = carritoAll.filter((carrito:any) => carrito.id == idNumber);
//             return carritoById;            

//         } catch(error:any) {
//             return {error: error.message};
//         }
//     }

//     async write(data:CarritoInterface): Promise<any> {
//         try {
//             await fs.promises.writeFile(this.url, JSON.stringify(data), 'utf-8')
//             return data;
//         } catch(err:any) {
//             return err.message;
//         }
//     }

//     async insertCarrito(data:any){
//         //lo pido sin ID. Lo averiguo acá. 
//         const carritoAll = await this.getCarritoAll();
//         const newId: number = await this.generarId(carritoAll);
//         const productoObj = {
//             id: newId,
//             timestamp: moment().format('yy-MM-DD HH:mm:ss'),
//             nombre:data.nombre,
//             descripcion:data.descripcion,
//             codigo:data.codigo,
//             foto:data.foto,
//             precio:data.precio,
//             stock:data.stock
//         }
        
//         const carrito:any = await this.getCarritoAll();
//         carrito.push(productoObj);

//         await this.write(carrito);

//         return productoObj;
//     }

//     async generarId(carrito:any) {
//         /* si no fuera async, se empiezan a pisar los ids */
//         const largo:number = carrito.length;
//         let max:number = 0;
//         for (let i=0;i<largo;i++) {
//             if (parseInt(carrito[i].id) > max) {
//                 max = parseInt(carrito[i].id);
//             }
//         }
//         return max + 1;
//     }

//     async deleteCarritoById(id:number) {
//         try {
//         const carrito:any = await this.getCarritoAll();
//         const carritoTemp = carrito.filter((carr:any)=> carr.id != id);
//         await this.write(carritoTemp);
//         return id
//         } catch (err:any) {
//             return {error: err.message};
//         }
//     }


//     async deleteCarritoAll() {
//         try {
//             const carrito:any = [];
//             await this.write(carrito);
//             return ({msg: "Carrito eliminado"});
//         } catch(err:any) {
//             return ({error: err.message})
//         }
//     }

//     async readProductos (){
//         const productos = await fs.promises.readFile('../productos/productos.txt');
//     }

//     async addCarritoById(id:number) {
//         try {
//             //Productos
//             const listaProductos:any = await this.readProductos();
//             const prod = listaProductos.filter((product:any) => product.id == id); 
            
//             if (!prod.length) { throw new Error('No hay productos disponibles. Comuniquese con el administrador')}

//             //Productos del carrito
//             const carrito = await fs.promises.readFile(this.url);
                
//             // carrito.push({
//             //     id: this.generarId(this.carrito),
//             //     timestamp: moment().format('yy-MM-DD HH:mm:ss'),
//             //     producto: prod
//             // })
//             console.log(carrito)
//             //await db.write("carrito", this.carrito)
//                return carrito;  
               
//         } catch (error:any) {
//             return {error: error.message}
//         }
//     }

// }




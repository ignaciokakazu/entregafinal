// import moment from 'moment';
// import { CarritoInterface, CarritoArray } from '../../carrito.interfaces';
// import { ProductoArray, ProductoDelCarritoInterface } from '../../productos.interfaces';

// export class CarritoMemoryDAO {
//     private carrito : CarritoArray;

//     constructor () {
//         this.carrito = [];
//     }

//     getCarritoAll(): CarritoArray {
//         return this.carrito;        
//     }

//     getCarritoById(id:number|string): CarritoArray|Object {
//         try {
//             let idNumber: number;
//             let carritoFilter: CarritoArray;

//             if (typeof id === 'string') {
//                 idNumber = parseInt(id);
//                 carritoFilter = this.carrito.filter((carrito:CarritoInterface) => carrito.id === idNumber);
//             } else {
//                 carritoFilter = this.carrito.filter((carrito:CarritoInterface) => carrito.id === id);
//             }
            
//             return carritoFilter;
        
//         } catch(err:any) {
//             return {error: err.message};
//         }
//     }

//     insertCarrito(data:ProductoDelCarritoInterface) : CarritoInterface {
//         //lo pido sin ID. Lo averiguo acá. 
//         const carritoAll: CarritoArray = this.carrito;
//         const productoObj: CarritoInterface = {
//             id: this.generarId(),
//             timestamp: moment().format('yy-MM-DD HH:mm:ss'),
//             producto: {
//                 id: data.id,
//                 nombre: data.nombre,
//                 descripcion: data.descripcion,
//                 codigo: data.codigo,
//                 foto: data.foto,
//                 precio: data.precio,
//                 stock: data.stock,
//                 timestamp: data.timestamp
//             }
//         }
        
//         this.carrito = this.getCarritoAll();
//         this.carrito.push(productoObj);

//         return productoObj;
//     }

//     generarId(): number {
//         /* si no fuera async, se empiezan a pisar los ids */
//         const largo:number = this.carrito.length;
//         let max:number=0;
//         for (let i=0;i<largo;i++) {
//             if (this.carrito[i].id > max) {
//                 max = this.carrito[i].id;
//             }
//         }
//         return max + 1;
//     }

//     deleteCarritoById(id:number|string):Object {
//         try {
//             const carrito:CarritoArray = this.getCarritoAll();
//             const carritoTemp:CarritoArray = carrito.filter((carr:CarritoInterface)=> carr.id != id);
//             this.carrito = carritoTemp;

//             return ({message: id})
//         } catch (err:any) {
//             return {error: err.message};
//         }
//     }


//     deleteCarritoAll() {
//         try {
//             this.carrito = [];
//             return ({msg: "Carrito eliminado"});
//         } catch(err:any) {
//             return ({error: err.message})
//         }
//     }

//     addCarritoById(id:number) {
//     //     try {
//     //         //Productos acá tengo que instanciar la clase producto
//     //         const listaProductos:ProductoArray = this.get();
//     //         const prod:ProductoArray = listaProductos.filter((product:ProductoDelCarritoInterface) => product.id == id); 
            
//     //         if (!prod.length) { throw new Error('No hay productos disponibles. Comuniquese con el administrador')}

//     //         //Productos del carrito
//     //         const carrito = await fs.promises.readFile(this.url);
            
//     //         const idCarrito = await this.generarId(this.carrito);
               
//     //         this.carrito.push({
//     //             id: idCarrito,
//     //             timestamp: moment().format('yy-MM-DD HH:mm:ss'),
//     //             producto: prod
//     //         })
//     //         console.log(this.carrito)
//     //         await db.write("carrito", this.carrito)
//     //            return this.carrito;  
               
//     //     } catch (error) {
//     //         return {error: error.message}
//     //     }
//     // }

// }


// }

import moment from 'moment';

export class ProductosMemoryDAO {
    lista:any;

    constructor() {
        this.lista = [
            {
                id:1,
                timestamp: new Date(),
                nombre:"Osobuco",
                descripcion:"Descripcion osobuco",
                codigo:"OSO",
                foto:"https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184247/osobuco_bv6hdd.jpg",
                precio:100,
                stock:8},
            {
                id:2,
                timestamp: new Date(),
                nombre:"Cebolla de verdeo",
                descripcion:"Descripcion Cebolla verdeo",
                codigo:"CEV",
                foto:"https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619390363/Cebolla-de-verdeo_y3bwhi.jpg",
                precio:12,
                stock:10
            },
            {
                id:3,
                timestamp:new Date(),
                nombre:"Cebolla morada",
                descripcion:"Descripcion cebolla morada",
                codigo:"CEM",
                foto:"https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184230/verduras_szswkw.jpg",
                precio:22,
                stock:18
            }
          ] 
        }
        
        async getProductosAll() {
            return this.lista;
        }

        async search(data:string) {
            return []
          }
          
        async getProductosById(id:number) {
            return this.lista.filter((producto:any)=>producto.id == id);
        }

        async insertProducto(data: any) {
            const obj = {
                id:this.lista.length,
                timestamp:new Date(),
                nombre:data.nombre,
                descripcion:data.descripcion,
                codigo:data.codigo,
                foto:data.foto,
                precio:data.precio,
                stock:data.stock                
            }
            this.lista.push(obj)
            return obj; 
        }

        async deleteProducto(id: number) {
            this.lista.filter((producto:any)=>producto.id!=id);
            return id;
        }

        async updateProducto(id:number, data:any) {
            this.lista.filter((producto:any)=>producto.id!=id);
            const obj = {
                id:id,
                timestamp:new Date(),
                nombre:data.nombre,
                descripcion:data.descripcion,
                codigo:data.codigo,
                foto:data.foto,
                precio:data.precio,
                stock:data.stock                
            }
            this.lista.push(obj)

            return obj;
        }
    }

    
import path from 'path';
import knex from 'knex';

export class ProductosSQLiteDAO {
    sqlite:any;
    lista:any;

    constructor() {
        this.sqlite = knex({
            client: 'sqlite3',
            connection: {
              filename: "./ecommerce.sqlite"
            //   useNullAsDefault: false;
            }
          });
          this.lista = {
                // id:1,
                // timestamp: new Date(),
                nombre:"Osobuco",
                descripcion:"Descripcion osobuco",
                codigo:"OSO",
                foto:"https://res.cloudinary.com/dfgfcd6ob/image/upload/v1619184247/osobuco_bv6hdd.jpg",
                precio:100,
                stock:8
            }

     
          this.sqlite.schema.hasTable('productos').then((exists:boolean)=> {
                if (!exists) {
                console.log('Se crea la tabla productos');
            
                this.sqlite.schema.createTable('productos', (productosTable:any) => {
                    productosTable.increments('id');
                    productosTable.string('nombre').notNullable();
                    productosTable.string('descripcion').notNullable();
                    productosTable.string('codigo').notNullable();
                    productosTable.string('foto').notNullable();
                    productosTable.decimal('precio',6,2).notNullable();
                    productosTable.integer('stock').notNullable();
                    productosTable.timestamp('timestamp').notNullable().defaultTo(new Date());
                    }).then(()=>{
                        this.sqlite('productos').insert(this.lista);
                    }).then(()=>{
                        console.log('done');
                    })
            }})        
        }
        
        async getProductosAll() {
            return await this.sqlite.select().table('productos');
        }

        async search(data:string) {
            return []
          }
          
        async getProductosById(id:number) {
            return await this.sqlite.select().table('productos').where({id: id});
        }

        async insertProducto(data: any) {
            return await this.sqlite('productos').insert(data);
        }

        async deleteProducto(id: number) {
            return await this.sqlite('productos').where({id: id}).del();
        }

        async updateProducto(id:number, data:any) {
            return await this.sqlite('productos').where({id:id}).update(data);
        }
    }

    
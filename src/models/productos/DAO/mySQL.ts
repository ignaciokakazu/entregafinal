import knex from 'knex';

export class ProductosMYSQLDAO {
    mySQL:any;
    lista:any;

    constructor() {
        this.mySQL = knex({
        client: 'mysql',
        connection: { //esto en venv
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'desafio17',
        },
        pool: { min: 0, max: 7 },
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

        this.mySQL.schema.hasTable('productos').then((exists:boolean)=> {
            if (!exists) {
            console.log('Se crea la tabla productos');
        
            this.mySQL.schema.createTable('productos', (productosTable:any) => {
                productosTable.increments('id');
                productosTable.string('nombre').notNullable();
                productosTable.string('descripcion').notNullable();
                productosTable.string('codigo').notNullable();
                productosTable.string('foto').notNullable();
                productosTable.decimal('precio',6,2).notNullable();
                productosTable.integer('stock').notNullable();
                
                productosTable.timestamp('timestamp').notNullable();
                }).then(()=>{
                    this.mySQL('productos').insert(this.lista);
                }).then(()=>{
                    console.log('done');
                })
        }})        
    }

        
        async getProductosAll() {
            return await this.mySQL.select().table('productos');
        }

        async getProductosById(id:number) {
            return await this.mySQL.select().table('productos').where({id: id});
        }
        
        async search(data:string) {
            return []
          }
          
        async insertProducto(data: any) {
            return await this.mySQL('productos').insert(data);
        }

        async deleteProducto(id: number) {
            return await this.mySQL('productos').where({id: id}).del();
        }

        async updateProducto(id:number, data:any) {
            return await this.mySQL('productos').where({id:id}).update(data);
        }
    }

    
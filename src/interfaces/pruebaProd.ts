
interface NewProducto {
    nombre: string,
    descripcion: string,
    codigo: string,
    fotos: string[],
    precio: number,
    stock: number,
    timestamp: Date,
    idCategoria: string
}

interface Producto {
    _id: string|number,
    nombre: string,
    descripcion: string,
    codigo: string,
    fotos: string[],
    precio: number,
    stock: number,
    timestamp: Date,
    idCategoria: string
}

function createProducto(prod: NewProducto) {
    console.log(prod)
}

createProducto({nombre: 'nombre', 
descripcion:'descripcion', 
codigo: 'cod', 
precio:500, 
stock: 12, fotos: ['hola', 'hola1'], timestamp: new Date(), idCategoria: '12345a'})


interface NewUsuario {
    nombre: string,
    telefono: number,
    email: string,
    password: string,
    admin: boolean
}

interface Usuario {
    _id: string|number,
    nombre: string,
    telefono: number,
    email: string,
    password: string,
    admin: boolean
}

/*•	UserId: Referencia al ObjectId del usuario. Debe ser único este campo. Es decir, solo puede existir un carrito por usuario
•	Productos: Array de objetos que contendrá la siguiente información
◦	ObjectId del producto
◦	Cantidad solicitada
•	TimeStamps correspondiente (Fecha de creación, fecha de update)
•	Dirección de Entrega: Objeto que tendrá la siguiente información
◦	Calle (required)
◦	Altura (required)
◦	Codigo Postal (required)
◦	Piso (opcional)
◦	Departamento (opcional) */

interface Carrito {
    userId: string, //id de usuario
    productos: ProdCarrito[],
    direccion: DireccionE
}

interface ProdCarrito {
    _id: string,
    cantidad: number,
    timestamp: Date
}

interface DireccionE {
    calle: string,
    altura: number,
    codigoPostal: number,
    piso?: number,
    departamento?: string|number,
}

function createDireccionE(dir: DireccionE) {
    console.log(dir)
}

createDireccionE({
    calle: 'Riv',
    altura: 123,
    codigoPostal: 1234,
    piso:3
})

/* Ordenes
Cada documento va a representar una orden generada en DB. Los campos seran los siguientes
•	OrderId : Id autogenerado por la DB
•	UserId: Referencia al ObjectId del usuario.
•	Items: Array de objetos donde cada objeto estara compuesto por
◦	Id del Producto
◦	Cantidad del producto
◦	Precio del producto
•	Timestamp para ver fecha de creacion
•	estado (por default en generado):
◦	4 opciones solamente (Generado, Pagado, Enviando, Finalizado)
•	total de la orden
*/

interface Orden {
    _id: string|number,
    userId: string|number, // id del usuario
    items: ProdOrden[],
    timestamp: Date,
    estado: string, //generado, pagado, enviando, finalizado
    total: number
}

interface ProdOrden {
    id: string|number,
    cantidad: number,
    precio: number
}

/* Cada documento va a representar un mensaje 
que se envio en el canal de chat creado para el proyecto. 
Los campos van a ser los siguientes
•	UserId: Referencia al objectId del usuario involucrado
•	Tipo: solo dos opciones.
◦	Usuario: Para los mensajes que recibimos del cliente
◦	Sistema: Para los mensajes que envia el server
•	Mensaje
*/ 

interface Mensaje {
    userId: string,
    tipo: string, // usuario-> del cliente. Sistema-> mensajes que envía el server
    mensaje: string
}


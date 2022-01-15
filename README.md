# Entrega Final - Proyecto Coderhouse

## Prerequisitos
node >=14.0.0
npm >=6.0.0

## Instalación
npm install

## Build
npm run build

## Uso
npm run start:test

# Introducción
Aplicación de E Commerce con Node Js, Typescript y Mongo DB. 
Se usaron los patrones MVC y DAO

# Endpoints
Para la documentación de los endpoints, ver http://localhost:8080/api-docs/

# Importante
Las variables de ambiente se ingresan en el archivo .env. El archivo .envExample contiene las diferentes variables utilizadas en la aplicación

## Modelos
### User
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
name | string | 50 | true | |
surname | string | 50 | true | |
username | string | 50 | true | email del usuario. No puede ser duplicado |
password | string | 20 | true | hasheado con bcrypt en la BD |
tel | number | - | true | |
admin | bool | - | true | por default, false |
direccion | objeto | 50 | true | ver `Direccion` |


#### Direccion
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
calle | string | 50 | true |  |
altura | number | - | true |  |
codigoPostal | string | 50 | true |  |
piso | number | - | false | por default |
departamento | string | - | false | por default '' |

### Productos
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
nombre | string | 50 | true |  |
descripcion | string | 50 | true |  |
codigo | string | 4 | true |  |
fotos | array | - | true | array de strings. El string es el nombre del archivo |
precio | number | - | true |  |
stock | number | - | true |  |
timestamp | date | - | true | autogenerado |

### Orden
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true |  |
items | array | - | true | array de items. Ver `items` |
timestamp | date | - | true | timestamp de creación y modificación de estado |
estado | string | true | true | 'Generado', 'Pagado', 'Enviado', 'Finalizado |
total | number | - | true | total de $ de la orden. Sumatoria de items.precio * items.cantidad |

#### Items
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
itemId | string | - | true |  |
cantidad | number | - | true |  |
precio | number | - | true |  |

### Carrito
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true | id dentro de la BD |
productos | array | - | true | array de productos. Ver `productos` |
direccion | array | - | true | direccion del usuario. Ver `direccion` en 'User' |

#### Productos
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
itemId | string | - | true |  |
cantidad | number | - | true |  |
timestamp | date | - | true | timestamp de agregado o modificado |

### Mensajes
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true | id del usuario |
tipo | bool | - | true | origen del mensaje. false para sistema. true para usuario |
mensaje | array | - | true | mensaje entregado |

## Controllers

### ClassCarrito
#### setCarritoNuevo
Agrega el carrito nuevo. Este método es utilizado en el alta de usuario (registración)
Recibe el username (o email)

#### setProductoToCarrito
Agrega un producto al carrito del usuario. Recibe del body el prodId y la cantidad.
Actualiza la BD de productos con el stock no disponible por sumarse al carrito

Response:
- 400: Cantidad inválida
- 400: Producto no existente por id
- 400: Stock insuficiente para el producto
- 200: {carrito}

#### deleteCarrito
Quita productos del carrito. Recibe del body el prodId y la cantidad.
Actualiza la BD de productos con el stock recuperado por quitarse del carrito

Response:
- 400: Cantidad inválida
- 400: Producto no existente por id
- 400: No existe el producto en el carrito
- 400: La cantidad del carrito es insuficiente
- 200: {carrito}

#### getCarritoByUsername
Devuelve el carrito del usuario. No recibe ningún parámetro ya que utiliza la variable tokenJWT (descripta en el controlador Login) para recuperar el username

Response:
- 400: No se encuentra loggeado el usuario
- 200: {carrito}

#### submit
Da por completada la orden. Para ello, totaliza la factura.
Utiliza el método createOrder de la clase Orden
No recibe ningún parámetro ya que utiliza la variable tokenJWT (descripta en el controlador Login) para recuperar el username

Response:
- 400: No se encuentra loggeado el usuario
- 200: {orden}

### ClassChat
Controlador del chat implementado con websocket.

#### sendMessage
Corrobora si el token del usuario es válido. Se pudo haber hecho con tokenJWT
Responderá:
A) “Stock” => Se responderá con el stock actual de todos los productos
B) “Orden” => Se responderá con los datos de la ultima orden del usuario
C) “Carrito” => Se responderá con los datos del carrito del usuario.
D) Cualquier otro mensaje se responderá con el siguiente mensaje:

````javascript
{msg: `Hola! No he podido comprender tu mensaje. 
                Por favor ingresa una de las siguientes opciones. 
                * Stock: para conocer nuestro stock actual
                * Orden: Para conocer la información de tu última orden
                * Carrito: para conocer el estado actual de tu carrito`}
````

### ClassLogin
Utilizada para lo relativo al usuario. Contiene una variable de nombre tokenJWT que, a lo largo de la aplicación, sirve para validar el token generado con JsonWebToken.

```javascript
tokenJWT {
    username: 'email',
    token: 'string',
    admin: 'boolean'
}
```

#### addUSer
Utilizada para la registración del usuario. 
Recibe del body:
- name
- surname
- username
- password
- passwordConfirmation
- tel
- direccion (calle, altura, codigoPostal, piso <opcional>, departamento <opcional>)
- admin

Valida:
1. Los datos enviados con Joi
2. Confirmación del password
3. Email (variable username en el código) no repetido

En el alta del usuario se encripta la contraseña con bcrypt. Agrega el timestamp
A su vez, se setea el carrito para el usuario, haciendo uso del método Carrito.setCarritoNuevo (ver en `Carrito`)

#### auth
Utilizada para autenticar al usuario. 
Recibe del body:
- username
- password

Valida:
1. Los datos enviados con Joi
2. Que username se encuentre en la BD users. 
3. Que el password sea correcto

Luego, ingresa los valores en el objeto tokenJWT (username, admin y token).

#### getIdByEmail
Método utilizado para devolver el userId por Email. Recibe un string (username o email)

### ClassOrden

#### getOrderByUserId
getOrderByUserId
Obtiene la orden del usuario. Para ello utiliza la variable tokenJWT (ver la clase `Login`)
Interfaz: ordenI)

#### getOrderById
Recibe por param la orderId. 
Devuelve la orden.

Interfaz: ordenI)

#### setOrderComplete
Recibe por el body la orderId. 
Pasa a estado "Completada la orden"
Devuelve error en el caso de que no se encuentre la orden o no esté en estado "GENERADO"
A su vez, envía un email al usuario con la orden y un sms
Devuelve la orden guardada

Response:
- 400: No se encuentra la orden con el id orderId
- 400: La orden no está en estado generada
- 200: {
    _id: 
    userId
    timestamp
    total
    items
}

#### createOrder
Recibe el carrito y crea la orden

### ClassProducto

#### getProductosAll
Devuelve todos los productos como un array de objetos. 

InterfazI ProductosI

Response:
- 400: Error
- 400: No hay productos en la base
- 200: {
}

#### getProductosByCat
Obtiene el id de categoría por param y devuelve todos los productos de la categoría, como un array de objetos

InterfazI ProductosI

Response:
- 400: Error
- 400: No se recibió el id de la categoría
- 200: {
}

#### getProductosById
Obtiene el id de producto por param y devuelve el producto

Response:
- 400: Error
- 400: No se recibió el id de la categoría
- 200: {
}

#### insertProducto
Obtiene el producto nuevo a través del body del Request.
Inserta el producto

Response:
- 400: Error
- 200: {
}

#### deleteProducto
Recibe el id de Producto por param y borra el producto

Response:
- 404: No existe el id de producto
- 200: Producto eliminado

#### updateProducto
Actualiza el producto. Recibe el producto por el body

Response:
- 404: No existe el id de producto
- 200: Producto modificado

#### search
Hace una búsqueda por string en el nombre del producto 
Recibe el string por param

Response:
- 400: Error
- 200: Array de productos que cumplen con la condición

#### validacionProd (middleWare)

Middleware hecho en Joi para la validación de los tipos y requisitos del objeto Producto



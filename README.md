# Entrega Final - Proyecto Coderhouse

## Prerequisitos
node >=14.0.0
npm >=6.0.0

## Instalación
npm install

## Build
npm run build

## Uso
npm run start

# Introducción
Aplicación de E Commerce con Node Js, Typescript y Mongo DB. 
Se usaron los patrones MVC y DAO

# Importante
Las variables de ambiente se ingresan en el archivo .env. El archivo .envExample contiene las diferentes variables utilizadas en la aplicación

# Endpoints

## Carrito
### GET - api/cart/
- Descripción: Devuelve el carrito del usuario. Necesita estar loggeado

- Response:
- '200': Respuesta exitosa:
````javascript
    {
        _id: string,
        userId: string,
        productos: [{
            _id: string,
            itemId: string,
            cantidad: number,
            timestamp: Date
        }],
        timestamp: Date, // fecha de creación y update
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        }
    }
````
- 400: No se encuentra loggeado el usuario

### POST - api/cart/add
- Descripción: Agrega un producto al carrito del usuario. Necesita estar loggeado como usuario
- Request body:
````javascript
    {
        prodId: string,
        cantidad: number
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        productos: [{
            _id: string,
            itemId: string,
            cantidad: number,
            timestamp: Date
        }],
        timestamp: Date, // fecha de creación y update
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        }
    }
````
- 400: El parámetro cantidad no es válido. Debe ser de tipo number y mayor a 0
````javascript
    {
        error: 'Cantidad inválida'
    }
````
- 400: No existe el prodId
````javascript
    {
        error: 'Producto no existente por id'
    }
````
- 400: No hay suficiente stock
````javascript
    {
        error: 'Stock insuficiente para la cantidad pedida'
    }
````
- 400: No se encuentra loggeado el usuario
````javascript
    {
        error: 'No se encuentra loggeado el usuario'
    }
````

### POST - api/cart/delete
- Descripción: Elimina productos del carrito del usuario. Necesita estar loggeado como usuario
- Request body:
````javascript
    {
        prodId: string,
        cantidad: number
    }
````
- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        productos: [{
            _id: string,
            itemId: string,
            cantidad: number,
            timestamp: Date
        }],
        timestamp: Date, // fecha de creación y update
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        }
    }
````
- 400: Cantidad inválida
````javascript
    {
        error: 'Cantidad inválida'
    }
````
- 400: Producto no existente por id
````javascript
    {
        error: 'Producto no existente por id'
    }
````
- 400: No se encuentra loggeado el usuario
````javascript
    {
        error: 'No se encuentra loggeado el usuario'
    }
````

### POST - api/cart/submit
- Descripción: Cierra la orden

- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        items: [{
            itemId: string,
            cantidad: number,
            precio: number
        }],
        timestamp: Date,
        estado: string, 
        total: number
    }
````
- 400: No se encuentra loggeado el usuario
````javascript
    {
        error: 'No se encuentra loggeado el usuario'
    }
````
- 400: carrito vacío
````javascript
    {
        error: 'Carrito vacío'
    }
````
## ORDERS
### GET - api/orders
- Descripción: Devuelve las órdenes del usuario loggeado

- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        items: [{
            itemId: string,
            cantidad: number,
            precio: number
        }],
        timestamp: Date,
        estado: string, 
        total: number
    }
````
- 400: No se encuentra loggeado el usuario
````javascript
    {
        error: 'No se encuentra loggeado el usuario'
    }
````


### GET - api/orders/{:orderId}
- Descripción: lista las órdenes con el id pedido del usuario loggeado
- Request param: orderId

- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        items: [{
            itemId: string,
            cantidad: number,
            precio: number
        }],
        timestamp: Date,
        estado: string, 
        total: number
    }
````
- 400: No se encuentra loggeado el usuario
- 400: No se encuentra la orden por id
````javascript
    {
        error: 'No se encuentra la orden por id'
    }
````


### POST - api/orders/complete
- Descripción: completa la orden del usuario
- Request body: 
````javascript
    {
        orderId: string,
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
        _id: string,
        userId: string,
        items: [{
            itemId: string,
            cantidad: number,
            precio: number
        }],
        timestamp: Date,
        estado: string, 
        total: number
    }
````
- 400: No se encuentra loggeado el usuario
````javascript
    {
        error: 'No se encuentra loggeado el usuario'
    }
````
- 400: No se encuentra la orden por id
````javascript
    {
        error: 'No se encuentra la orden por id'
    }
````
- 400: Carrito vacío, no se puede completar la orden
````javascript
    {
        error: 'Carrito vacío, no se puede completar la orden'
    }
````

## Productos
### GET - api/products/
- Descripción: No necesita una autenticación previa. Devuelve todos los productos
- Response:
- '200': Respuesta exitosa
````javascript
    {
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
````
- '400': No se encuentran productos
````javascript
    {
        error: 'No se encuentran productos'
    }
````

### GET - api/products/{:category}
- Descripción: No necesita una autenticación previa. Devuelve los productos de la categoría pedida (id de categoría)
- Request param: id de categoría
- Response:
- '200': Respuesta exitosa
````javascript
    {
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
````
- '400': No se encuentra el id de categoría
````javascript
    {
        error: 'No se encuentra el id de categoría'
    }
````

### POST - api/products/
- Descripción: Necesita de autenticación previa. Debe ser admin.
Agrega un producto a la lista de productos
- Request body: 
````javascript
    {
        nombre: string,
        descripcion: string,
        codigo: string,
        fotos: string[],
        precio: number,
        stock: number,
        idCategoria: string
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
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
````
- '400': Errores de validación. Ver `Modelos`
````javascript
    {
        error: 'El código debe contener 3 caracteres mínimo'
    }
````
- '400': No se enviaron los datos del producto
````javascript
    {
        error: 'No hay datos'
    }
````

### PUT - api/products/{:productId}
- Descripción: Necesita de autenticación previa. Debe ser admin.
Modifica los datos del producto
- Request param: id del producto
- Request body: 
````javascript
    {
        nombre: string,
        descripcion: string,
        codigo: string,
        fotos: string[],
        precio: number,
        stock: number,
        timestamp: Date
        idCategoria: string
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
        msg: 'Producto modificado ${id}'
    }
````
- '400': Errores de validación. Ver `Modelos`
````javascript
    {
        error: 'El código debe contener 3 caracteres mínimo'
    }
````

### PUT - api/products/{:productId}
- Descripción: Necesita de autenticación previa. Debe ser admin.
Modifica los datos del producto
- Request param: id del producto
- Request body: 
````javascript
    {
        nombre: string,
        descripcion: string,
        codigo: string,
        fotos: string[],
        precio: number,
        stock: number,
        timestamp: Date
        idCategoria: string
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
        msg: 'Producto modificado ${id}'
    }
````
- '400': Errores de validación. Ver `Modelos`
````javascript
    {
        error: 'El código debe contener 3 caracteres mínimo'
    }
````

### PUT - api/products/{:productId}
- Descripción: Necesita de autenticación previa. Debe ser admin.
Modifica los datos del producto
- Request param: id del producto
- Request body: 
````javascript
    {
        nombre: string,
        descripcion: string,
        codigo: string,
        fotos: string[],
        precio: number,
        stock: number,
        timestamp: Date
        idCategoria: string
    }
````

- Response:
- '200': Respuesta exitosa
````javascript
    {
        msg: 'Producto modificado ${id}'
    }
````
- '400': Errores de validación. Ver `Modelos`
````javascript
    {
        error: 'El código debe contener 3 caracteres mínimo'
    }
````

### DELETE - api/products/{:productId}
- Descripción: Necesita de autenticación previa. Debe ser admin.
Elimina el producto
- Request param: id del producto

- Response:
- '200': Respuesta exitosa
````javascript
    {
        msg: 'Producto eliminado'
    }
````
- '400': No se encuentra el producto con ese id
````javascript
    {
        error: 'No existe el producto'
    }
````


## Login
### GET - api/user/login
- Descripción: Genera un token de sesión para acceder a las rutas segurizadas
- Request body:
````javascript
    {
        username: string,
        password: string
    }
````
- Response:
- '200': Respuesta exitosa
````javascript
    {
        username: string,
        token: string
        admin: boolean
    }
````
- '401': No autorizado
````javascript
    {
        error: 'Error en usuario o contraseña'
    }
````
- '400': Error en validación de los datos
````javascript
    {
        error: 'Password debe contener 8 caracteres'
    }
````
### POST - api/user/signup
- Descripción: Da de alta un usuario para el posterior login. Crea el carrito por default del usuario
- Request body:
````javascript
    {
        name: string,
        surname: string,
        username: string,
        password: string,
        passwordConfirmation: string,
        tel: number,
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        },
        admin: boolean
    }
````
- Response:
- '201': Respuesta exitosa
````javascript
    {
        name: string,
        surname: string,
        username: string,
        password: string,
        passwordConfirmation: string,
        tel: number,
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso: number,
            departamento: string|number,
        },
        admin: boolean
    }
````
- '400': Error en validación de los datos
````javascript
    {
        error: 'Password debe contener 8 caracteres'
    }
````

### POST - api/user/signup
- Descripción: Da de alta un usuario para el posterior login. Crea el carrito por default del usuario
- Request body:
````javascript
    {
        name: string,
        surname: string,
        username: string,
        password: string,
        passwordConfirmation: string,
        tel: number,
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        },
        admin: boolean
    }
````
- Response:
- '201': Respuesta exitosa
````javascript
    {
        name: string,
        surname: string,
        username: string,
        password: string,
        passwordConfirmation: string,
        tel: number,
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso: number,
            departamento: string|number,
        },
        admin: boolean
    }
````
- '400': Error en validación de los datos
````javascript
    {
        error: 'Password debe contener 8 caracteres'
    }
````
## Images
### POST - api/images/upload
- Descripción: Da de alta las imágenes (máximo 2 archivos) del producto. Debe estar loggeado y ser admin
- Request files: archivos de imágen (png, jpg, etc.)
- Request body:
````javascript
    {
        prodId: string,
    }
````
- Response:
- '201': Respuesta exitosa
- '400': No se encuentra el/los file/s
````javascript
    {
        error: 'No subió archivos'
    }
````
- '400': Falta el prodId del body
````javascript
    {
        error: 'Falta prodId'
    }
````

### GET - api/images/{id}
- Descripción: Permite acceder a una imagenes
- Request param: nombre del archivo de la imagen. El nombre se encuentra en el array productos.fotos

- Response:
- '200': URL de la imagen
- '404': No se encuentra el/los file/s
````javascript
    {
        error: 'No se encuentra'
    }
````

### DELETE - api/images/{id}
- Descripción: Debe ser admin y estar autenticado. 
- Request param: nombre del archivo de la imagen. El nombre se encuentra en el array productos.fotos
- Response:
- '200': Respuesta exitosa
- '404': No se encuentra el/los file/s
````javascript
    {
        error: 'No se encuentra'
    }
````



# Modelos
## User
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


### Direccion
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
calle | string | 50 | true |  |
altura | number | - | true |  |
codigoPostal | string | 50 | true |  |
piso | number | - | false | por default |
departamento | string | - | false | por default '' |

## Productos
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

## Orden
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true |  |
items | array | - | true | array de items. Ver `items` |
timestamp | date | - | true | timestamp de creación y modificación de estado |
estado | string | true | true | 'Generado', 'Pagado', 'Enviado', 'Finalizado |
total | number | - | true | total de $ de la orden. Sumatoria de items.precio * items.cantidad |

### Items
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
itemId | string | - | true |  |
cantidad | number | - | true |  |
precio | number | - | true |  |

## Carrito
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true | id dentro de la BD |
productos | array | - | true | array de productos. Ver `productos` |
direccion | array | - | true | direccion del usuario. Ver `direccion` en 'User' |

### Productos
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
itemId | string | - | true |  |
cantidad | number | - | true |  |
timestamp | date | - | true | timestamp de agregado o modificado |

## Mensajes
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
-------------- | ---- | ------------ | --------- | ------------- |
id | string o number | 50 | true | id dentro de la BD |
userId | string | - | true | id del usuario |
tipo | bool | - | true | origen del mensaje. false para sistema. true para usuario |
mensaje | array | - | true | mensaje entregado |

# Controllers

## ClassCarrito
### setCarritoNuevo
Agrega el carrito nuevo. Este método es utilizado en el alta de usuario (registración)
Recibe el username (o email)

### setProductoToCarrito
Agrega un producto al carrito del usuario. Recibe del body el prodId y la cantidad.
Actualiza la BD de productos con el stock no disponible por sumarse al carrito

Response:
- 400: Cantidad inválida
- 400: Producto no existente por id
- 400: Stock insuficiente para el producto
- 200: {
    
}

### deleteCarrito
Quita productos del carrito. Recibe del body el prodId y la cantidad.
Actualiza la BD de productos con el stock recuperado por quitarse del carrito

Response:
- 400: Cantidad inválida
- 400: Producto no existente por id
- 400: No existe el producto en el carrito
- 400: La cantidad del carrito es insuficiente
- 200: {carrito}

### getCarritoByUsername
Devuelve el carrito del usuario. No recibe ningún parámetro ya que utiliza la variable tokenJWT (descripta en el controlador Login) para recuperar el username

Response:
- 400: No se encuentra loggeado el usuario
- 200: 
````javascript
    {
        _id: string,
        userId: string,
        productos: [{
            _id: string,
            itemId: string,
            cantidad: number,
            timestamp: Date
        }],
        timestamp: Date, // fecha de creación y update
        direccion: {
            calle: string,
            altura: number,
            codigoPostal: string,
            piso?: number,
            departamento?: string|number,
        }
    }
````

### submit
Da por completada la orden. Para ello, totaliza la factura.
Utiliza el método createOrder de la clase Orden
No recibe ningún parámetro ya que utiliza la variable tokenJWT (descripta en el controlador Login) para recuperar el username

Response:
- 400: No se encuentra loggeado el usuario
- 200: {orden}

## ClassChat
Controlador del chat implementado con websocket.

### sendMessage
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

## ClassLogin
Utilizada para lo relativo al usuario. Contiene una variable de nombre tokenJWT que, a lo largo de la aplicación, sirve para validar el token generado con JsonWebToken.

```javascript
tokenJWT {
    username: 'email',
    token: 'string',
    admin: 'boolean'
}
```

### addUSer
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

### auth
Utilizada para autenticar al usuario. 
Recibe del body:
- username
- password

Valida:
1. Los datos enviados con Joi
2. Que username se encuentre en la BD users. 
3. Que el password sea correcto

Luego, ingresa los valores en el objeto tokenJWT (username, admin y token).

### getIdByEmail
Método utilizado para devolver el userId por Email. Recibe un string (username o email)

## ClassOrden

### getOrderByUserId
getOrderByUserId
Obtiene la orden del usuario. Para ello utiliza la variable tokenJWT (ver la clase `Login`)
Interfaz: ordenI)

### getOrderById
Recibe por param la orderId. 
Devuelve la orden.

Interfaz: ordenI)

### setOrderComplete
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

### createOrder
Recibe el carrito y crea la orden

## ClassProducto

### getProductosAll
Devuelve todos los productos como un array de objetos. 

InterfazI ProductosI

Response:
- 400: Error
- 400: No hay productos en la base
- 200: {
}

### getProductosByCat
Obtiene el id de categoría por param y devuelve todos los productos de la categoría, como un array de objetos

InterfazI ProductosI

Response:
- 400: Error
- 400: No se recibió el id de la categoría
- 200: {
}

### getProductosById
Obtiene el id de producto por param y devuelve el producto

Response:
- 400: Error
- 400: No se recibió el id de la categoría
- 200: {
}

### insertProducto
Obtiene el producto nuevo a través del body del Request.
Inserta el producto

Response:
- 400: Error
- 200: {
}

### deleteProducto
Recibe el id de Producto por param y borra el producto

Response:
- 404: No existe el id de producto
- 200: Producto eliminado

### updateProducto
Actualiza el producto. Recibe el producto por el body

Response:
- 404: No existe el id de producto
- 200: Producto modificado

### search
Hace una búsqueda por string en el nombre del producto 
Recibe el string por param

Response:
- 400: Error
- 200: Array de productos que cumplen con la condición

### validacionProd (middleWare)

Middleware hecho en Joi para la validación de los tipos y requisitos del objeto Producto

# Vistas
Generadas con handlebars

# Servicios
## Logger
Logger creado con Log4JS. El archivo del log se encuentra en el root

## Websocket
Socket-io para el chat

## Twilio
Utilizado para enviar SMS con la orden (clase Orden)

## Swagger
Utilizado para la documentación de los endpoints. Es posible consultarlo desde http://localhost:8080/api-docs

## Email
NodeMailer para enviar mails con la orden (clase Orden)

# MiddleWares
## JWT.ts
Corrobora que el usuario se encuentre loggeado

## middleAdmin.ts
Corrobora que el usuario sea Admin para la carga de productos

## multer.js
Middleware de Multer para la subida de archivos al servidor

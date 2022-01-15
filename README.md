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

### ClassChat

### ClassLogin
Utilizada para lo relativo al usuario. Contiene una variable de nombre tokenJWT que, a lo largo de la aplicación, sirve para validar el token generado con JsonWebToken.

tokenJWT {
    username: 'email',
    token: 'string',
    admin: 'boolean'
}

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

### ClassOrden

### ClassProducto


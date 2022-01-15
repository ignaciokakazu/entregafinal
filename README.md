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

## Modelos
### User
Campo/variable | Tipo | Longitud máx | Requerido | Observaciones |
--- | --- | --- | --- | --- | --- |
id | string o number | 50 | true | id dentro de la BD |
name | string | 50 | true | |
surname | string | 50 | true | |
username | string | 50 | true | email del usuario. No puede ser duplicado |
password | string | 20 | true | hasheado con bcrypt en la BD |
tel | number | - | true | |
admin | bool | - | true | por default, false |
direccion | objeto | 50 | true | ver Direccion |



    calle: {
        type: String,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    piso: {
        type: Number,
        required: false
    },
    departamento: {
        type: String,
        required: false
    }

### Orden


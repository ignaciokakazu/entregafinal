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
Attempt | #1 | #2 | #3 | #4 | #5 | #6 | #7 | #8 | #9 | #10 | #11
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
Seconds | 301 | 283 | 290 | 286 | 289 | 285 | 287 | 287 | 272 | 276 | 269

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


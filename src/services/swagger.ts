import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Proyecto Desafío final Coderhouse',
        version: '0.0.1',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'Ignacio',
          url: 'https://example.com',
          email: 'ignaciokakazu@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Development server',
        },
      ],
    },
    apis: ['src/routes/*'],
  };

export const swaggerDocument = swaggerJsDoc(options)
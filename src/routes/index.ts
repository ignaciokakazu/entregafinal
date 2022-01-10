import express from 'express';
import routerProductos from './productos';
import routerCarrito from './carrito';
import routerHB from './hb';
import routerLogin from './login';
import { isLoggedIn } from '../middleware/passportLocal';
import routerImages from './images'
import routerError from './error';

const mainRouter = express.Router();

mainRouter.use('/', routerHB);
mainRouter.use('/api/images', routerImages)
mainRouter.use('/api/productos', routerProductos);
mainRouter.use('/api/login', routerLogin);
mainRouter.use('/api/carrito', isLoggedIn, routerCarrito);
mainRouter.use('*', routerError);


export default mainRouter;

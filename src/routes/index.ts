import express from 'express';
import routerProductos from './productos';
import routerCarrito from './carrito';
import routerHB from './hb';
import routerLogin from './login';
import { verifyToken } from '../middleware/jwt';
import { isAdmin } from '../middleware/middleAdmin';
import routerImages from './images'
import routerError from './error';

const mainRouter = express.Router();

mainRouter.use('/', routerHB);
mainRouter.use('/api/images', routerImages)
mainRouter.use('/api/productos', routerProductos);
mainRouter.use('/api/user', routerLogin);
mainRouter.use('/api/carrito', verifyToken, isAdmin, routerCarrito);
mainRouter.use('*', routerError);

export default mainRouter;

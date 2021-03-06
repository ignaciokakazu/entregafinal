import express from 'express';
import routerProductos from './productos';
import routerCarrito from './carrito';
import routerHB from './hb';
import routerLogin from './login';
import { verifyToken } from '../middleware/jwt';
import { isAdmin } from '../middleware/middleAdmin';
import routerImages from './images'
import routerError from './error';
import routerOrders from './orders';

const mainRouter = express.Router();

mainRouter.use('/', routerHB);
mainRouter.use('/api/images', routerImages)
mainRouter.use('/api/products', routerProductos);
mainRouter.use('/api/orders', routerOrders);
mainRouter.use('/api/user', routerLogin);
mainRouter.use('/api/cart', verifyToken, routerCarrito);
mainRouter.use('*', routerError);

export default mainRouter;

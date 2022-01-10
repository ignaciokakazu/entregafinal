import express, {Request, Response} from 'express';
import {Productos} from '../controllers/ClassProductos';
import { isLoggedIn } from '../middleware/passportLocal';
import {Carrito} from '../controllers/ClassCarrito';

const router = express.Router();

// router.get('/', isLoggedIn, (req,res)=> {
//     res.render('main');
// })

router.get('/', (req, res)=> {
    res.render('main');
})

router.get('/admin', (req,res)=> {
    // req.logout();
    // console.log(req.session)
    res.render('login/login');
})

router.get('/admin/error', (req, res)=> {
     res.render('error');
})

router.get('/register', (req, res)=> {
    res.render('login/register');
})

router.get('/admin/index', async (req, res)=> {
    //  const prod = await Productos.getProductosAll(req, res);
    //  const datos = {
    //      prod: prod 
    //  }
     res.render('crud/crud'); //datos);
 })

 router.get('/checkout', async (req, res)=> {
     res.render('login/checkout'); 
 })


export default router;
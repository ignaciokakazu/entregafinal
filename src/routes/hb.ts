import express, {Request, Response} from 'express';
import { isAdmin } from '../middleware/middleAdmin';
import { verifyToken } from '../middleware/jwt';
import { Productos } from '../controllers/ClassProductos';

const router = express.Router();

router.get('/', async (req, res)=> {
    res.render('main');
})

router.get('/admin', (req,res)=> {
    res.render('login/login');
})

router.get('/admin/error', (req, res)=> {
     res.render('error');
})

router.get('/register', (req, res)=> {
    res.render('login/register');
})

router.get('/admin/index', verifyToken, isAdmin, async (req, res)=> {
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
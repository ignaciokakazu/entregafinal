import express from 'express';
import url from 'url';
import {Login} from '../controllers/ClassLogin';
import passport from '../middleware/passportLocal';
import {Carrito} from '../controllers/ClassCarrito';
import {Request, Response, NextFunction} from 'express';
import {upload} from '../middleware/multer';
import { infoLogger } from '../services/logger';

const router = express.Router();

router.post('/register', upload.single('avatar'), Login.addUser);

router.get('/paso', (req: Request, res:Response) => {
    res.send('paso')
})
router.get('/error', (req: Request, res:Response) => {
    res.send('error')
})
/* mínimo a pasar por request: 
{
"name": "hola",
"email": "ignaciokakazu1@gmail.com",
"password": "123456789",
"passwordConfirmation": "123456789",
"tel": ""
}
*/

router.post('/auth', (req:Request, res:Response, next:NextFunction) => {
    
    // passport.authenticate('login', {successRedirect: '/paso', failureRedirect: '/error'});
    passport.authenticate('login', async function (err,data,info) {

    if (err) {
        infoLogger.info('router auth, linea 12')
        res.status(401).json({msg: 'error', success: false});
        return next(err)
    } 
    infoLogger.info('data')
    infoLogger.info(data);
    console.log('data');
    console.log(data);
    console.log('info');
    console.log(info);
    if(!data) {
        console.log('router auth, linea 17');
        infoLogger.info('router auth, linea 17')
        return res.status(401).json({msg: 'error autenticación', success:false});
    }

    infoLogger.info('router auth, linea 20')
    
    const userId:string = await Login.getIdByEmail(req.body.email);
    const carritoId = await Carrito.setCarritoNuevo(userId);
    
    const obj = {
        msg: 'ok',
        success:true,
        id: userId,
        carritoId: carritoId
    }

    res.status(200).json({msg: obj});
    
    })(req,res,next);
});

/* mínimo a pasar por request: 
{
"email": "ignaciokakazu1@gmail.com",
"password": "123456789",
}
*/
router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


export default router;
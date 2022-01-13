import express from 'express';
import {Login} from '../controllers/ClassLogin';
import {Request, Response, NextFunction} from 'express';
import {upload} from '../middleware/multer';
import { infoLogger } from '../services/logger';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/jwt';
import config from '../config/config';
import {isAdmin} from '../middleware/middleAdmin';

const router = express.Router();

router.post('/register', upload.single('avatar'), Login.addUser);

export let tokenJWT:any;

router.post('/login' , Login.auth) 
        
router.get('/prueba' , verifyToken , (req:Request,res:Response) => {
     res.send('You are Authorized!')
})

router.get('/pruebaAdmin' , verifyToken, isAdmin, (req:Request,res:Response) => {
    res.send('You are Admin')
})

router.get("/logout", function (req, res) {
    const authHeader: any = req.headers["authorization"] || req.query.accesstoken;
    tokenJWT = '';
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg : 'You have been Logged Out' });
        } else {
            res.send({msg:'Error'});
        }
        });
    });

router.post('/signup', Login.addUser);

export default router;
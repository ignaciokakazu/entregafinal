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

export let tokenJWT:any;


/**
 * @swagger
 * api/user/login/:
 *   post:
 *     summary: Log in del usuario. Con Usuario y Contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserI'
 *     responses:
 *       200:
 *         description: Log in del usuario. Con Usuario y Contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado
 *                 data:
 *                    
 *       403:
 *         description: Validación de campos no cumple con los requisitos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *
 */
router.post('/login' , Login.auth) 
        
/**
 * @swagger
 * api/user/logout/:accesstoken:
 *   get:
 *     summary: Log out del usuario. Con access token de JWT
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Log out del usuario. Con access token de JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: You have been logout
 *                 data:
 *                    
 *       403:
 *         description: Error en el procedimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Error
 *
 */
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

/**
 * @swagger
 * api/user/signup/:
 *   post:
 *     summary: Registración del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUserI'
 *     responses:
 *       200:
 *         description: Registración del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: Usuario agregado
 *                 data:
 *                    
 *       403:
 *         description: Validación de campos no cumple con los requisitos. Username duplicado. Ya existe el username en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *
 */
router.post('/signup', Login.addUser);

export default router;
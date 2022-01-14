import {Request, Response, NextFunction} from 'express';
import {apiLogin} from '../apis/login';
import {UserI, NewUserI} from '../interfaces/login.interfaces';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import {infoLogger} from '../services/logger';
import jwt from 'jsonwebtoken';
import {LoginI, DireccionE} from '../interfaces/login.interfaces';
import config from '../config/config';
import { Carrito } from './ClassCarrito';
import { api } from '../apis/api';

/*el controller está en medio de API y models (donde también están las interfaces)
por ende, usa la API de Login, y la API usa la BD
el Req/Res sale de acá: 
*/
/*  Req/res-> Controller. Maneja la lógica
    API->Maneja la interacción con la BD (que está en models). Por eso los métodos de API son iguales a los del DAO
*/
export let tokenJWT:any; 
//el tokenJWT está para ser rellenado con los valores de JWT cuando se loguea (ruta api/user/login)

const joiSchemaNewUser = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    surname: Joi.string().min(3).max(50).required(),
    username: Joi.string().email().min(3).required(), //ES EMAIL
    password: Joi.string().min(8).max(20).required(),
    passwordConfirmation: Joi.string().min(8).max(20).required(),
    direccion: {
        calle: Joi.string().min(3).max(50).required(),
        altura: Joi.number().integer().min(1).required(),
        codigoPostal: Joi.string().min(3).max(50).required(),
        piso: Joi.number().integer().min(1),
        departamento: Joi.string(),
    },
    tel: Joi.number().integer().required(),
    admin: Joi.boolean()
})

const joiSchemaLog = Joi.object().keys({
    username: Joi.string().email().min(3).required(),
    password: Joi.string().min(8).max(20).required()
})

class ClassLogin {
    private user: string;
    private password: string;
    private admin: boolean;
    private saltRounds:number;

    constructor() {
        this.user = "";
        this.password = "";
        this.admin = false;
        this.saltRounds = 10;
    }

    async addUser(req:Request, res:Response) {
        try {
        const password = req.body.password;
        const passwordConfirmation = req.body.passwordConfirmation;

        const flagPassword: boolean = password === passwordConfirmation? true : false;
        
        !flagPassword? res.status(400).json({error: "Password y PasswordConfirmation no coinciden"}) : '';

        infoLogger.log("file" + req.body.file)
        
        const joiValidacion = joiSchemaNewUser.validate(req.body);

        if (joiValidacion.error) {
            let textoError:string = '';

            joiValidacion.error.details.forEach(msg=> {
                textoError += msg.message;
            })

            res.status(400).json({error: textoError});
            return;
        }

        const userArr = await apiLogin.getByEmail(req.body.username);
        
        if (userArr) {
            res.status(400).json({error: 'Username (email) duplicado'})
            return
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if (!err) {
                    //guarda en la BD
                     
                     await apiLogin.addUser({
                        name: req.body.name,
                        surname: req.body.surname,
                        username: req.body.username,
                        password: hash,
                        tel: req.body.tel,
                        direccion: {
                            calle: req.body.direccion.calle,
                            altura: req.body.direccion.altura,
                            codigoPostal: req.body.direccion.codigoPostal,
                            piso: req.body.piso? req.body.direccion.piso : 0,
                            departamento: req.body.departamento? req.body.direccion.departamento : ''
                        },
                        admin: req.body.admin,
                        timestamp: new Date(),
                    })
                    
                    await Carrito.setCarritoNuevo(req.body.username);
                }
            });
        });

            infoLogger.info(`Usuario ${req.body} dado de alta ${new Date()}`);
            const user = await apiLogin.getByEmail(req.body.username);
            infoLogger.log(user)
            
            
            // await Carrito.setCarritoNuevo(userId)
            res.status(201).json({msg: `Usuario ${req.body} dado de alta ${new Date()}`, success:true})
        
        } catch(e:any) {
            infoLogger.info(`${e.message}`);
            res.json({msg: e.message, success:false});
        }
    }
   
    async auth(req:Request, res:Response, next: NextFunction) {
        //auth por Mongo
        infoLogger.log(req.body)
        infoLogger.info(req.body)
        
        const user:LoginI = {
            username: req.body.username,
            password: req.body.password
        }

        const joiValidacion = joiSchemaLog.validate(user);

        if (joiValidacion.error) {
            let textoError:string = '';

            joiValidacion.error.details.forEach(msg=> {
                textoError += msg.message;
            })

            res.status(403).json({error: textoError});
            return;
        }
    
        // buscar en Mongo
        const userMongo = await apiLogin.getByEmail(req.body.username);
        const validate = await apiLogin.validatePassword(user.username, user.password);
        
        infoLogger.log(validate);
        if (validate) {
            const accessToken = jwt.sign({id: user.username}, config.JWT_SECRET_KEY , { expiresIn: config.TOKEN_KEEP_ALIVE })
            tokenJWT = {
                token: accessToken,
                user: user.username,
                admin: false
            }
        
            res.header('authorization', accessToken).json({msg:'Usuario Autenticado', token: accessToken});    
            // res.json({msg: 'ok', success:true});
        } else {
            res.json({error:'error en usuario o contraseña', success:false});
        }

    }

    async getIdByEmail(email: string): Promise<string> {
        const userMongo:UserI = await apiLogin.getByEmail(email);
        return userMongo._id
    }


}
/* */
export const Login = new ClassLogin()
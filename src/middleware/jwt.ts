import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import  config from '../config/config';
import {tokenJWT} from '../controllers/ClassLogin';

export function verifyToken(req:Request, res:Response, next:NextFunction) {
    // https://stackoverflow.com/questions/62014713/jwt-node-authentication-req-headersauthorization-is-undefined
    console.log(req.headers)
    console.log(req.headers['access-token'])
    const accessToken:any = req.headers['authorization'] || req.query.accesstoken; //puede llegar por query
    console.log(tokenJWT)
    // console.log(authHeader)
    // const token = authHeader && authHeader.split(" ")[1];
    // console.log(token)
    let decoded:string = '';

    tokenJWT? decoded = jwtDecode(tokenJWT.token) : decoded = ''
    console.log(decoded);
    if (!decoded) {
        res.json({error:'error'})
        return
    }

    if (!accessToken) {
        res.json({error: 'error'})
        return
    }
    
    jwt.verify(accessToken, config.JWT_SECRET_KEY, (err:any, user:any) => {
            if (err) return res.sendStatus(404);
            req.user = user;
            next();
        });
    }

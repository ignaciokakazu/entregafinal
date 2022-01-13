import {Request, Response, NextFunction} from 'express';
import {tokenJWT} from '../controllers/ClassLogin';

export const isAdmin = (req:Request, res: Response, next: NextFunction) => {
    console.log('isAdmin Middleware')
    console.log(tokenJWT.admin);    
    tokenJWT.admin? next() : res.status(403).json({error: 'Error: no es admin'})
}


// import {DecodeResult, ExpirationStatus, Session, decodeSession, encodeSession, checkExpirationStatus} from './jwt';

// let admin:boolean = false;

// export const middleAdmin = (req: Request, res: Response, next: NextFunction) => {
//     console.log("middleware admin")
//     console.log(admin)
//     admin? next() : res.status(403).json({error: "Error de autenticación"})
// }

// /**
//  * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
//  */
// export function requireJwtMiddleware(request: Request, response: Response, next: NextFunction) {
//     const unauthorized = (message: string) => response.status(401).json({
//         ok: false,
//         status: 401,
//         message: message
//     });

//     const requestHeader = "X-JWT-Token";
//     const responseHeader = "X-Renewed-JWT-Token";
//     const header = request.header(requestHeader);
    
//     if (!header) {
//         unauthorized(`Required ${requestHeader} header not found.`);
//         return;
//     }

//     const decodedSession: DecodeResult = decodeSession(SECRET_KEY_HERE, header);
    
//     if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
//         unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
//         return;
//     }

//     const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

//     if (expiration === "expired") {
//         unauthorized(`Authorization token has expired. Please create a new authorization token.`);
//         return;
//     }

//     let session: Session;

//     if (expiration === "grace") {
//         // Automatically renew the session and send it back with the response
//         const { token, expires, issued } = encodeSession(SECRET_KEY_HERE, decodedSession.session);
//         session = {
//             ...decodedSession.session,
//             expires: expires,
//             issued: issued
//         };

//         response.setHeader(responseHeader, token);
//     } else {
//         session = decodedSession.session;
//     }

//     // Set the session on response.locals object for routes to access
//     response.locals = {
//         ...response.locals,
//         session: session
//     };

//     // Request has a valid or renewed session. Call next to continue to the authenticated route handler
//     next();
// }
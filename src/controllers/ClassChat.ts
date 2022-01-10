import {Request, Response, NextFunction} from 'express';

class ClassChat {
    private userId;

    constructor(userId: string) {
        this.userId = userId
    }

    init(req:Request, res: Response, next: NextFunction) {
        // middleware para corroborar y guardar

        //         El server realizara las siguientes acciones al recibir ese evento
        // •	Chequeará que el token pertenezca a un usuario valido.
        // •	Si no existe el usuario respondera con un socket indicando que el usuario es incorrecto
        // •	Si el usuario es correcto, toma su mensaje y lo guarda en un nuevo documento en la colección de mensaje

        // buscar userId en BD

        // si no es correcto, devuelve
        // si es correcto, guarda

        next();
    }

    sendMsg(req:Request, res: Response) {
//         Se enviara un socket con el nombre “resp-message” y la respuesta tendrá la siguiente lógica:

// A) “Stock” => Se responderá con el stock actual de todos los productos
// B) “Orden” => Se responderá con los datos de la ultima orden del usuario
// C) “Carrito” => Se responderá con los datos del carrito del usuario.
// D) Cualquier otro mensaje se deberá responder con el siguiente mensaje:

        if (req.body.msg === 'Stock') {
            //guardar en BD
        } else if (req.body.msg === 'Orden') {
            //guardar en BD
        } else if (req.body.msg === 'Carrito') {
            //guardar en BD
        } else {
            //guardar en BD
            res.json({msg: "Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones. /n Stock: /n blablabla"})
        }

    }
   

}
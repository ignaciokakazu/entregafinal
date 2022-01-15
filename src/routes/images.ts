import express, {Request, Response, NextFunction} from 'express';
import {Productos} from '../controllers/ClassProductos';
import { NewProductoInterface } from '../interfaces/productos.interfaces';
import { isAdmin } from '../middleware/middleAdmin';
import { verifyToken } from '../middleware/jwt';
import { upload } from '../middleware/multer';

const router = express.Router();

/**
 * @swagger
 * api/images/upload/:
 *   post:
 *     summary: Guarda imagenes, hasta 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Guarda imagenes, hasta 2 imagenes
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
 *
 */
router.post('/upload', 
    verifyToken, 
    isAdmin, 
    function(req:Request,res:Response, next: NextFunction){
    upload(req, res, function(err) { 
        //req.body para los datos, req.files para el array de archivos
        try {
          const filesArray = [];

          if (req.files) {
              const files: any = req.files;
              for (let i=0; i<files.length; i++) {
                  filesArray.push(files[i].filename)
              }
          }

          if(err) {
              console.log(err)
              res.end("Error uploading file.");
              return 
          }

          Productos.validacionProd(req, res, next);
        
          const newProducto: NewProductoInterface = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            fotos: filesArray,
            precio: req.body.precio,
            stock: req.body.stock,
            timestamp: new Date(),
            idCategoria: req.body.idCategoria
        }
          req.body = newProducto
          const respuesta = Productos.insertProducto(req, res);

          res.status(200).json(respuesta);

      } catch (error: any) {
        res.status(403).json({error: error.message})
      }
    });
});

/**
 * @swagger
 * api/images/:id:
 *   get:
 *     summary: Obtiene las imagenes según el id de la imagen
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description:  Obtiene las imagenes según el id de la imagen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: No se encuentra
 *                 data:
 *                    
 *
 */
router.get("/", (req:Request, res:Response) => {
  const img: string = req.params.id;
  res.send(`http://localhost:8080/public/uploads/${img}`)
});

export default router
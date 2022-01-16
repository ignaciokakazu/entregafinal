import express, {Request, Response, NextFunction} from 'express';
import {api} from '../apis/api';
import { isAdmin } from '../middleware/middleAdmin';
import { verifyToken } from '../middleware/jwt';
import { upload } from '../middleware/multer';
import { ProductosSQLiteDAO } from '../models/productos/DAO/sqlite';
import { NewProductoInterface } from '../interfaces/productos.interfaces';
import fs from 'fs';

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
    upload(req, res, async function(err) { 
        //req.body para los datos, req.files para el array de archivos

        if (!req.files) {
          res.status(400).json({error: "No subió archivos"})
          return
        }
        if (!req.body.prodId) {
          res.status(400).json({error: "Falta prodId"})
          return
        }

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

          const prod = await api.getProductosById(req.body.prodId)

          const prodNuevo: NewProductoInterface = {
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            fotos: filesArray,
            precio: prod.precio,
            stock: prod.stock,
            timestamp: new Date(),
            idCategoria: prod.idCategoria
          }

          const up = await api.updateProducto(req.body.prodId, prodNuevo);

          res.status(200).json('ok');

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
router.get("/:id", (req:Request, res:Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({error: 'Falta el id de la imagen'})
      return
    }

    const img: string = req.params.id;
    
    const path = `./public/uploads/${img}`;

    if (fs.existsSync(path)) {
      res.status(200).json({url: `http://localhost:8080/uploads/${img}`});
      
    } else {
      res.status(400).json({error: `No se encuentra el archivo con ese id`});
    }
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
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
router.delete('/:id', 
              verifyToken,
              isAdmin,
              async (req, res)=> {
    try {
      console.log(req);
      if (!req.params.id) {
        res.status(400).json({error: 'Falta el id de la imagen'})
        return
      }
  
      const img: string = req.params.id;
      
      const path = `./public/uploads/${img}`;
      
      if (!fs.existsSync(path)) {
        res.status(400).json({error: `No se encuentra el archivo con ese id`});
        return
      };

        fs.unlink(path, function (err) {
          if (err) res.status(400).json({error: err});
          // if no error, file has been deleted successfully
          res.status(200).json({msg: 'eliminado ' + img})
      });
    

    } catch (error: any) {
      res.status(400).json({error: error.message})
    }
})
export default router
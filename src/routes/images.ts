import express, {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import {Productos} from '../controllers/ClassProductos';
import { NewProductoInterface } from '../interfaces/productos.interfaces';
import { isAdmin } from '../middleware/middleAdmin';
import { verifyToken } from '../middleware/jwt';

const router = express.Router();

// const upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

var upload = multer({ storage : storage }).array('foto',2);

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

          const respuesta = Productos.insertProducto(newProducto);

          res.status(200).json(respuesta);

      } catch (error: any) {
        res.status(403).json({error: error.message})
      }
    });
});

router.get("/", (req:Request, res:Response) => {
  const img: string = req.params.id;
  res.send(`/public/uploads/${img}`)
});

export default router
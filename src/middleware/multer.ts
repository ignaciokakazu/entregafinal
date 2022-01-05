import multer from 'multer';
import {Request, Response, NextFunction} from 'express';
import Moment from 'moment';

// export const uploadFiles = (req:Request, res:Response, next:NextFunction)=> {
//     const upload = multer({dest:'./public/data/uploads/'})
//     upload.single('avatar');
//     console.log(req)
//     console.log(req.avatar)
//     console.log(req.files);
//     next();
// }


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Moment().format('YYYY-MM-DD-HH-mm-ss-A')
      cb(null, file.originalname + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })

  
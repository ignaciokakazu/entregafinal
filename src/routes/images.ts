import express, {Request, Response, NextFunction} from 'express';
import multer from 'multer';

const router = express.Router();

// const upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

var upload = multer({ storage : storage }).array('foto',2);

router.post('/upload',function(req:Request,res:Response){
    upload(req,res,function(err) {
        console.log(req.body);
        console.log(req.files);
        console.log(req.files);
        console.log(req.files?.length)
        console.log(typeof req.files)
        if (req.files) {
            const files: any = req.files;

            for (let i=0; i<files.length; i++) {
                console.log(files[i].filename)
            }
        }

        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

// router.post('/upload', 
//     upload.single('foto'), 
//     function(req:Request, res:Response, next: NextFunction) {
//      // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.file)
//     console.log(req.body)
//     res.json({msg: 'hola'})
 
// })

// router.post('/upload', (req:Request, res:Response)=> {
//     console.log(req.body);
// })
export default router
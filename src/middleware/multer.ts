import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

export const upload = multer({ storage : storage }).array('foto',2);

  
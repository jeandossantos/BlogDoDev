import multer from 'multer';
import path from 'path';

export = {
  dest: path.resolve(__dirname, '..', 'public', 'images'),
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid type file.'));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
};

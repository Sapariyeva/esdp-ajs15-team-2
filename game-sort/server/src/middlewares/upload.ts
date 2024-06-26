import config from '@/config';
import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, config.uploadPath);
  },
  filename: (_, file, callback) => {
    callback(null, randomUUID() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

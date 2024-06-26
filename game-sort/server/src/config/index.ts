import path from 'path';

const rootPath = path.join(__dirname, '..', '..');

const config = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
};

export default config;

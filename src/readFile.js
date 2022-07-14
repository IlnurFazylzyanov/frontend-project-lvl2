import { readFileSync } from 'fs';
import path from 'path';
import parsersFile from './parsers.js';

export default (filepath) => {
  const pathFile = (file) => path.resolve(process.cwd(), file);
  const extName = (file) => path.extname(file);
  const comprasionFile = (file) => parsersFile(readFileSync(pathFile(file), 'utf-8'), extName(file));
  return comprasionFile(filepath);
};

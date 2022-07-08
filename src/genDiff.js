import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parsersFile from './parsers.js';

const pathFile = (filepath) => path.resolve(process.cwd(), filepath);
const extName = (filepath) => path.extname(filepath);
const comprasionFile = (filepath) => parsersFile(readFileSync(pathFile(filepath), 'utf-8'), extName(filepath));

export default (filepath1, filepath2) => {
  const file1 = comprasionFile(filepath1);
  const file2 = comprasionFile(filepath2);
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const getDistinction = sortedKeys
    .map((key) => {
      if (!_.has(file2, key)) {
        return `- ${key}: ${file1[key]}`;
      }
      if (!_.has(file1, key)) {
        return `+ ${key}: ${file2[key]}`;
      }
      if (file1[key] === file2[key]) {
        return `  ${key}: ${file1[key]}`;
      }
      return `- ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    })
    .join('\n  ');
  return `{\n  ${getDistinction}\n}`;
};

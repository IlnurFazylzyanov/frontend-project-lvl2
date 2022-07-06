import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

export default (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const file1 = JSON.parse(readFileSync(path1, 'utf-8'));
  const file2 = JSON.parse(readFileSync(path2, 'utf-8'));
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

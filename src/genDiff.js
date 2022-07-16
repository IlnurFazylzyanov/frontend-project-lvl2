import getTreeDiff from './getTreeDiff.js';
import readFile from './readFile.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatName) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const diff = getTreeDiff(file1, file2);
  return format(diff, formatName);
};

import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('expected type JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFileSync(getFixturePath('expectedStylishFile.txt'), 'utf-8');
  expect(stylish(genDiff(file1, file2))).toEqual(expected);
});

test('expected type YML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFileSync(getFixturePath('expectedStylishFile.txt'), 'utf-8');
  expect(stylish(genDiff(file1, file2))).toEqual(expected);
});

test('expected type YAML', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFileSync(getFixturePath('expectedStylishFile.txt'), 'utf-8');
  expect(stylish(genDiff(file1, file2))).toEqual(expected);
});

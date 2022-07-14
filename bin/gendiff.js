#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';
import stylish from '../src/formatters/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and show a difference')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>  output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(stylish(genDiff(filepath1, filepath2)));
  });
program.parse(process.argv);

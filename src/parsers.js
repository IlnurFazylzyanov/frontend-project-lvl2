import yaml from 'js-yaml';

export default (data, typeFile) => {
  let parse;
  if (typeFile === '.yaml' || typeFile === '.yml') {
    parse = yaml.load;
  } else if (typeFile === '.json') {
    parse = JSON.parse;
  }
  return parse(data);
};

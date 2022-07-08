import yaml from 'js-yaml';

export default (data, typeFile) => {
    let parse;
    if (typeFile === '.yaml' || typeFile === '.yml') {
      parse = yaml.load;
    } else if (typeFile === '.json') {
      parse = JSON.parse;
    } else {
      throw new Error(`File extension "${typeFile}" not supported`);
    }
    return parse(data);
  };

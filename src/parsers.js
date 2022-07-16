import yaml from 'js-yaml';

export default (data, typeFile) => {
  switch (typeFile) {
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      return 'no typeFile';
  }
};

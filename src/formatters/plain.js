import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (currentValue, node) => {
    const lines = Object.entries(currentValue).map(([key, value]) => {
      switch (value.type) {
        case 'nested':
          return iter(value.children, `${node}${key}.`);
        case 'added':
          return `Property '${node}${key}' was added with value: ${getValue(value.value)}`;
        case 'deleted':
          return `Property '${node}${key}' was removed`;
        case 'changed':
          return `Property '${node}${key}' was updated. From ${getValue(value.previusValue)} to ${getValue(value.currentValue)}`;
        case 'unchanged':
          return '';
        default:
          return 'no value.type';
      }
    });
    return _.compact([...lines]).join('\n');
  };
  return iter(diff, '');
};
export default plain;

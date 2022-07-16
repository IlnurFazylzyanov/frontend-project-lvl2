import _ from 'lodash';

const stylish = (diff, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const keyIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(([key, node]) => {
      switch (node.type) {
        case 'deleted':
          return `${keyIndent}- ${key}: ${iter(node.value, depth + 2)}`;
        case 'added':
          return `${keyIndent}+ ${key}: ${iter(node.value, depth + 2)}`;
        case 'unchanged':
          return `${keyIndent}  ${key}: ${iter(node.value, depth + 1)}`;
        case 'changed':
          return `${keyIndent}- ${key}: ${iter(node.previusValue, depth + 2)}\n${keyIndent}+ ${key}: ${iter(node.currentValue, depth + 2)}`;
        case 'nested':
          return `${keyIndent}  ${key}: ${iter(node.children, depth + 2)}`;
        default:
          return `${keyIndent}  ${key}: ${iter(node, depth + 2)}`;
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};

export default stylish;

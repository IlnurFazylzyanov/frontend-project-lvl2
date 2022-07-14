import _ from 'lodash';

const getTreeDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { ...acc, [`${key}`]: { type: 'nested', value: getTreeDiff(data1[key], data2[key]) } };
    }
    if (!_.has(data1, key)) {
      return { ...acc, [`${key}`]: { type: 'added', value: data2[key] } };
    }
    if (!_.has(data2, key)) {
      return { ...acc, [`${key}`]: { type: 'deleted', value: data1[key] } };
    }
    if (data1[key] !== data2[key]) {
      return { ...acc, [`${key}`]: { type: 'changed', previusValue: data1[key], currentValue: data2[key] } };
    }
    return { ...acc, [`${key}`]: { type: 'unchanged', value: data1[key] } };
  }, {});

  return result;
};

export default getTreeDiff;

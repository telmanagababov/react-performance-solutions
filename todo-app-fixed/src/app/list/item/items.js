import { memoize } from 'lodash';

const names = [
  'Bailee',
  'Bailey',
  'Beatrice',
  'Beatrix',
  'Beatriz',
  'Beau',
  'Belen',
  'Belinda',
  'Doug',
  'Peter',
  'Sarah',
  'Kelly',
  'Brook',
  'Liam',
  'Zak',
];

const toValue = memoize(
  function getValue(value) {
    if (value <= 0) return 0;
    if (value === 1) return 1;
    return getValue(value - 1) + getValue(value - 2);
  }
);

export function getRandomName() {
  return names[Math.ceil(Math.random() * (names.length - 1))];
}

export function getRandomValue() {
  return toValue(10 + Math.round(Math.random() * 20));
}

export function generateItems(itemsNumber) {
  return Array.from(new Array(itemsNumber))
    .map(() => ({
      name: getRandomName(),
      value: getRandomValue(),
      isSelected: false,
    }));
}

export default { generateItems };
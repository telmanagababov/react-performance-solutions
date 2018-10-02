const names = [
  'Jim',
  'Ken',
  'Murray',
  'Koen',
  'Charlie',
  'Donald',
  'Bart',
  'Gregory',
  'Doug',
  'Peter',
  'Sarah',
  'Kelly',
  'Brook',
  'Liam',
  'Zak',
  'Jim',
];

export function getRandomName() {
  return names[Math.ceil(Math.random() * (names.length - 1))];
}

export function getRandomValue() {
  return 10 + Math.round(Math.random() * 20);
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
import { blockWidth, minRadndomNumber } from './varaible';

const getRandom = (range = 150) => {
  const negOrPosOne = Math.round(Math.random()) * 2 - 1;
  let randomNumber = Math.round(Math.random() * range);
  while (randomNumber <= minRadndomNumber) {
    randomNumber = Math.round(Math.random() * range);
  }
  console.log(randomNumber);
  return randomNumber * negOrPosOne;
}
  
export const gaetRandomData = (count, range = 200) => {
  const array = [];
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < count; i++) {
    let thisX = getRandom(range);
    let thisY = getRandom(range);
    if ((sumX + thisX) >= blockWidth - 30 || (sumX + thisX) <= 0) thisX *= -1;
    if ((sumY + thisY) >= blockWidth - 30 || (sumY + thisY) <= 0) thisY *= -1;
    sumX += thisX;
    sumY += thisY;
    array.push({ x: thisX, y: thisY, text: i + 1 });
  }
  return array
};
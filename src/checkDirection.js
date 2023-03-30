export function checkDirection(y, x, gridSize) {
  let directions = [
    { y: y - 1, x: x }, //norte
    { y: y - 1, x: x + 1 }, //nordeste
    { y: y, x: x + 1 }, //este
    { y: y + 1, x: x + 1 }, //sudeste
    { y: y + 1, x: x }, //sur
    { y: y + 1, x: x - 1 }, //suroeste
    { y: y, x: x - 1 }, //oeste
    { y: y - 1, x: x - 1 }, //noroeste
  ];
  for (let i = 0; i < directions.length; i++) {
    if (
      directions[i].y < 0 ||
      directions[i].y > gridSize - 1 ||
      directions[i].x < 0 ||
      directions[i].x > gridSize - 1
    ) {
      directions[i] = undefined;
    }
  }
  let filteredDirections = directions.filter((el) => el != undefined);
  let aliveCount = 0;
  for (let i = 0; i < filteredDirections.length; i++) {
    let y = filteredDirections[i].y;
    let x = filteredDirections[i].x;
    if (grid[y][x].state === true) {
      aliveCount++;
    }
  }
  return aliveCount;
}

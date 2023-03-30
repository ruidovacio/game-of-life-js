import { checkDirection } from "./checkDirection.js";

//crear la grilla
const gridSize = 10;
let isOn = false;
grid = createGrid(gridSize, false);
let loop = null;

//accion de botones
document.querySelector("#run").addEventListener("click", function() {
  isOn = !isOn;
  runSimulation();
  const change = () => {
    this.innerHTML = isOn ? "stop" : "run";
    this.classList.contains("stop") ?
    this.classList.remove("stop") :
    this.classList.add("stop");
  };
  change();
});
document.querySelector("#clear").addEventListener("click", () => {
  if (!isOn) {
    grid = createGrid(gridSize, false);
    document.querySelector("#randomValue").value = 50
    displayGrid(grid);
  }
});
document.querySelector("#random").addEventListener("click", () => {
  if (!isOn) {
    grid = createGrid(gridSize, true, (document.querySelector("#randomValue").value));
    displayGrid(grid);
  }
});
document.querySelector("#randomValue").addEventListener("click", function(){
  if (!isOn) {
    grid = createGrid(gridSize, true, (document.querySelector("#randomValue").value));
    displayGrid(grid);
  } else {
    this.value = 50;
    // document.querySelector("#randomValue").target.value = 50
  }
})

//iniciar programa
displayGrid();


//logica de grilla
function createGrid(gridSize,randomize,randomValue) {
  const grid = [];
  let randomer = randomValue / 100;
  for (let y = 0; y < gridSize; y++) {
    const row = [];
    for (let x = 0; x < gridSize; x++){
      let cell = {x: x, y: y, state: false}
      if (randomize){
        cell.state = Math.random() > randomer;
      }
      row.push(cell);
    }
    grid.push(row);
  }
  console.log(grid);
  return grid;
}

function displayGrid() {
  document.querySelector("#grid").innerHTML = "";
  grid.map((el) => {
    let buttonRow = document.createElement("div");
    el.map((fl) => {
      let button = document.createElement("button");
      button.innerHTML = "&nbsp";
      button.classList.add("celula")
      button.classList.add(fl.state ? "alive" : "dead");
      button.addEventListener("click", ()=> {
        if(!isOn){
        fl.state = !fl.state
        displayGrid(grid);
        console.log(checkDirection(fl.y,fl.x,10));
      }})
      buttonRow.appendChild(button);
    });
    document.querySelector("#grid").appendChild(buttonRow);
  });
}

//logica de evolucion
function runSimulation() {
  if(isOn) {
    loop = setInterval(evolution, 200);
  } else {
    clearInterval(loop);
  }
}

function evolution() {
  let newGrid = JSON.parse(JSON.stringify(grid));
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let y = grid[row][col].y;
      let x = grid[row][col].x;
      let aliveCount = checkDirection(y, x, gridSize);
      if (grid[y][x].state == false) {
        if (aliveCount === 3) {
          console.log(grid[y][x]);
          newGrid[y][x].state = true;
        }
      } else if (grid[y][x].state == true) {
        if (aliveCount < 2) {
          console.log(grid[y][x]);
          newGrid[y][x].state = false;
        } else if (aliveCount === 2 || aliveCount === 3) {
          console.log(grid[y][x]);
          newGrid[y][x].state = true;
        } else if (aliveCount > 3) {
          console.log(grid[y][x]);
          newGrid[y][x].state = false;
        }
      }
    }
  }
  grid = JSON.parse(JSON.stringify(newGrid));
  displayGrid();
}

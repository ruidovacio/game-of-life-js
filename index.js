navbar = document.getElementById("navbar")
grid = document.getElementById("grid")

let cellsGrid = undefined
let newCellsGrid = []
let running = false
let bucle = undefined
let genCount = 0
let randomGen = false
const gridSize = 10

//Crear grid
function createGrid() {
  cellsGrid = []
  for (let y = 0; y < gridSize; y++) {
    const cellsRow = []
    for (let x = 0; x < gridSize; x++) {
      cell = { x: x, y: y, state: false }
      if (randomGen) {
        randomNum = Math.random()
        if (randomNum>0.5){
          cell.state = true
        }
      }
      cellsRow.push(cell)
    }
    cellsGrid.push(cellsRow)
  }
  displayGrid();
}

function navButton() {
  navbar.innerHTML = ""

  run = document.createElement("button")
  run.classList.add("parameter")
  if (!running) {
    run.innerHTML = "run"
  } else {
    run.innerHTML = "stop"
    run.classList.add("stop")
  }
  run.addEventListener("click", function () {
    randomGen = false
    running = !running
    console.log(running);
    runSimulation();
    navButton();
  })

  clear = document.createElement("button")
  clear.classList.add("parameter")
  clear.innerHTML = "clear"
  clear.addEventListener("click", function () {
    if (!running) {
      randomGen = false
      createGrid();
    }
  })

  randombtn = document.createElement("button")
  randombtn.classList.add("parameter")
  randombtn.innerHTML = "random"
  randombtn.addEventListener("click", function () {
    if (!running) {
      randomGen = true
      createGrid();
    }
  })


  navbar.appendChild(run)
  navbar.appendChild(clear)
  navbar.appendChild(randombtn)
}

//Display grid
function displayGrid() {
  grid.innerHTML = ""
  cellsGrid.map(el => {
    botones = document.createElement("div")
    el.map(fl => {
      boton = document.createElement("button")
      boton.innerHTML = "&nbsp"
      boton.classList.add("boton")
      if (!fl.state) {
        boton.classList.add("dead")
      } else { boton.classList.add("alive") }
      boton.addEventListener("click", function () {
        if (!running) {
          console.log(`x: ${fl.x} y: ${fl.y} ?: ${fl.state}`)
          console.log(checkDirections(fl.y, fl.x))
          fl.state = !fl.state;
          updateGrid();
        }
      });
      botones.appendChild(boton)
    })
    grid.appendChild(botones)
  })
}

function runSimulation() {
  genCout = 0
  clearInterval(bucle)
  if (running) {
    bucle = setInterval(evolution, 200)
  }
}

function evolution() {
  newCellsGrid = JSON.parse(JSON.stringify(cellsGrid))
  console.log(genCount)
  genCount++
  for (let row = 0; row < cellsGrid.length; row++) {
    for (let col = 0; col < cellsGrid[row].length; col++) {
      let y = cellsGrid[row][col].y
      let x = cellsGrid[row][col].x
      let liveCount = checkDirections(y, x)
      if (cellsGrid[y][x].state == false) {
        if (liveCount === 3) {
          console.log(cellsGrid[y][x])
          newCellsGrid[y][x].state = true;
        }
      }
      else if (cellsGrid[y][x].state == true) {
        if (liveCount < 2) {
          console.log(cellsGrid[y][x])
          newCellsGrid[y][x].state = false;
        }
        else if (liveCount === 2 || liveCount === 3) {
          console.log(cellsGrid[y][x])
          newCellsGrid[y][x].state = true;
        }
        else if (liveCount > 3) {
          console.log(cellsGrid[y][x])
          newCellsGrid[y][x].state = false;
        }
      }
    }
  }
  cellsGrid = JSON.parse(JSON.stringify(newCellsGrid))
  updateGrid();
}

function checkDirections(y, x) {
  directions = []
  directions[0] = { y: y - 1, x: x } //norte
  directions[1] = { y: y - 1, x: x + 1 } //nordeste
  directions[2] = { y: y, x: x + 1 } //este
  directions[3] = { y: y + 1, x: x + 1 } //sudeste
  directions[4] = { y: y + 1, x: x } //sur
  directions[5] = { y: y + 1, x: x - 1 } //suroeste
  directions[6] = { y: y, x: x - 1 } //oeste
  directions[7] = { y: y - 1, x: x - 1 } //noroeste
  for (i = 0; i < directions.length; i++) {
    if (directions[i].y < 0
      || directions[i].y > gridSize - 1
      || directions[i].x < 0
      || directions[i].x > gridSize - 1) {
      directions[i] = undefined
    }
  }
  filteredDirections = directions.filter(el => el != undefined)
  let liveCount = 0
  for (i = 0; i < filteredDirections.length; i++) {
    let y = filteredDirections[i].y
    let x = filteredDirections[i].x
    if (cellsGrid[y][x].state === true) {
      liveCount++
    }
  }
  return liveCount;
}

function updateGrid() {
  displayGrid();
}

navButton()
createGrid()

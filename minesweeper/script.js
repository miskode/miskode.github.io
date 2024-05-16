//Global variables
let mouse = [-1, -1];
let tile = [-1, -1];
let grid = [];
let revealed = [];
let flagged = [];
let flags = 0;
let gWidth = 0;
let gHeight = 0;
let started = false;
let dug = false;
let alive = true;
let timer = 0;



//Functions
function setup() {
  gWidth = document.getElementById("width").value;
  gHeight = document.getElementById("height").value;
  flags = Math.round(0.0002 * (gWidth * gHeight) ** 2 + 0.1044 * (gWidth * gHeight) + 0.2979);
  console.log(flags);
  if (gWidth * gHeight > 0) {
    document.getElementById("game").style.display = "initial";
    document.getElementById("grid").style.width =
      (gWidth * 25).toString() + "px";
    document.getElementById("grid").style.height =
      (gHeight * 25).toString() + "px";
    document.getElementById("title").style.display = "none";
    for (let i = 0; i < gWidth * gHeight; i++) {
      let h = document.getElementById("grid");
      let g = document.createElement("div");
      g.id = i;
      if (
        (i % 2 === 0 && Math.floor(i / gHeight) % 2 == 0) ||
        (i % 2 === 1 && Math.floor(i / gHeight) % 2 == 1)
      ) {
        g.style.backgroundColor = "#00c800";
      } else {
        g.style.backgroundColor = "#00e000";
      }
      g.classList.add("box");
      h.append(g);
    }
    addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
    });
    addEventListener("mousemove", (e) => {
      update(e.x, e.y);
    });
    addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        dig(tile[0], tile[1]);
        update(e.x, e.y);
      } else if (e.button === 2) {
        e.preventDefault();
        flag(tile[0], tile[1]);
        update(e.x, e.y);
      }
    });
  }
  update(10000000, 100000000);
}



function game_over() {
  alive = false;
  document.getElementById("game").style.display = "none";
  document.getElementById("gameover").style.display = "initial";
}



function gridmap(x, y) {
  return y * gWidth + x;
}



function valid_box(x, y) {
  if (x < 0 || x >= gWidth || y < 0 || y >= gHeight) {
    return false;
  }
  return true;
}



function tilemap(x, y) {
  if (started) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const boardWidth = gWidth * 25;
    const boardHeight = gHeight * 25;
    const origin = [
      windowWidth / 2 - boardWidth / 2,
      windowHeight / 2 - boardHeight / 2,
    ];
    return [Math.floor((x - origin[0]) / 25), Math.floor((y - origin[1] - 23) / 25)];
  }
  return [-1, -1];
}



function dig(x, y) {
  if (alive) {
    if (!dug) {
      while(grid[gridmap(x, y)] !== "") {
        grid = [];
        revealed = [];
        flagged = [];
        make_grid(gWidth, gHeight);
      }
    }
    dug = true;
    let digTile = grid[gridmap(x, y)];
    switch (digTile) {
      case "X":
        //game over
        break;
      case "":
        if (flagged[gridmap(x, y)]) {
          flagged[gridmap(x, y)] = false;
        }
        revealed[gridmap(x, y)] = true;
        for (let i of [
          [-1, -1],
          [0, -1],
          [1, -1],
          [-1, 0],
          [1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
        ]) {
          if (valid_box(x + i[0], y + i[1])) {
            if (!revealed[gridmap(x + i[0], y + i[1])]) {
              dig(x + i[0], y + i[1]);
            }
          }
        }
        break;
      default:
        if (!revealed[gridmap(x, y)]) {
          if (flagged[gridmap(x, y)]) {
            flagged[gridmap(x, y)] = false;
          }
          revealed[gridmap(x, y)] = true;
        } else {
          let f = 0;
          for (let i of [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
          ]) {
            if (valid_box(x + i[0], y + i[1])) {
              if (flagged[gridmap(x + i[0], y + i[1])]) {
                f++;
              }
            }
          }
          console.log(`${f}, ${digTile}`)
          if (f === digTile) {
            for (let i of [
              [-1, -1],
              [0, -1],
              [1, -1],
              [-1, 0],
              [1, 0],
              [-1, 1],
              [0, 1],
              [1, 1],
            ]) {
              if (valid_box(x + i[0], y + i[1])) {
                if (!flagged[gridmap(x + i[0], y + i[1])] && !revealed[gridmap(x + i[0], y + i[1])]) {
                  dig(x + i[0], y + i[1]);
                }
              }
            }
          }
        }
        break;
    }
  }
}



function update(ex, ey) {
  if (alive) {
    mouse[0] = ex;
    mouse[1] = ey;
    const colors = ["transparent", "#0000ff", "#008800", "#ff0000", "#dd00ff","#880000", "#00dddd", "#000000", "#666666"];
    tile = tilemap(mouse[0], mouse[1]);
    let x, y = 0;
    for (let i = 0; i < gWidth * gHeight; i++) {
      x = i % gWidth;
      y = Math.floor(i / gWidth);
      let g = document.getElementById(i.toString());
      if (
        (x % 2 === 0 && y % 2 === 0) ||
        (x % 2 === 1 && y % 2 === 1)
      ) {
        if (!revealed[i]) {
          g.style.backgroundColor = "#00bb00";
        } else {
          g.style.backgroundColor = "#8f8f8f";
        }
      } else {
        if (!revealed[i]) {
          g.style.backgroundColor = "#00c800";
        } else {
          g.style.backgroundColor = "#aaaaaa";
        }
      }
    }
    if (valid_box(tile[0], tile[1])) {
      if (revealed[gridmap(tile[0], tile[1])]) {
        document.getElementById(
          gridmap(tile[0], tile[1]).toString()
        ).style.backgroundColor = "#bbbbbb";
        if (grid[gridmap(tile[0], tile[1])] !== "" && grid[gridmap(tile[0], tile[1])] !== "X") {
        }
      } else {
        document.getElementById(
          gridmap(tile[0], tile[1]).toString()
        ).style.backgroundColor = "#44d444";
      }
    }
    for (let i = 0; i < gWidth * gHeight; i++) {
      let g = document.getElementById(i.toString());
      if (revealed[i]) {
        switch(grid[i]) {
          case "":
            break;
          case "X":
            g.innerHTML = "X";
            break;
          default:
            g.innerHTML = grid[i];
            g.style.color = colors[grid[i]];
            break;
        }
      } else {
        if (flagged[i]) {
          g.innerHTML = "";
          let h = document.createElement("img");
          h.src = "flag.png";
          h.classList.add("flag")
          g.append(h);
        } else {
          g.innerHTML = "";
        }
      }
    }
  }
}



function make_grid(x, y) {
  for (let i = 0; i < x * y; i++) {
    revealed.push(false);
    flagged.push(false);
  }
  const mines = Math.round(0.0002 * (x * y) ** 2 + 0.1044 * (x * y) + 0.2979);
  for (let i = 0; i < mines; i++) {
    grid.push("X");
  }
  for (let i = 0; i < x * y - mines; i++) {
    grid.splice(randint(0, grid.length + 1), 0, "");
  }
  //Making Numbers
  for (let b = 0; b < gHeight; b++) {
    for (let a = 0; a < gWidth; a++) {
      let mineCount = 0;
      if (grid[gridmap(a, b)] === "") {
        for (let i of [
          [-1, -1],
          [0, -1],
          [1, -1],
          [-1, 0],
          [1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
        ]) {
          if (valid_box(a + i[0], b + i[1])) {
            if (grid[gridmap(a + i[0], b + i[1])] === "X") {
              mineCount++;
            }
          }
        }
        if (mineCount > 0) {
          grid[gridmap(a, b)] = mineCount;
        }
      }
    }
  }
}



function flag(x, y) {
  if (flagged[gridmap(x, y)]) {
    flagged[gridmap(x, y)] = false;
  } else {
    flagged[gridmap(x, y)] = true;
  }
}



async function do_timer() {
  while (alive) {
    timer++;
    let out = ""
    switch (timer.toString().length) {
      case 1:
        out = `00${timer}`;
        break;
      case 2:
        out = `0${timer}`;
        break;
      case 3:
        out = timer;
        break;
      default:
        out = "999";
        break;
    }
    document.getElementById("timers").innerHTML = out;
    await new Promise(resolve => setTimeout(resolve, 940));
  }
}



function print_grid() {
  let t = "";
  for (let i = 0; i < gWidth * gHeight; i++) {
    if (i % gWidth === 0 && i !== 0) {
      console.log(t);
      t = "";
    } else {
      t += grid[i] + " ";
    }
  }
  console.log(t);
}



function randint(x, y) {
  return Math.floor(Math.random() * (y - x)) + x;
}



function start() {
  started = true;
  setup();
  make_grid(gWidth, gHeight);
  do_timer();
}

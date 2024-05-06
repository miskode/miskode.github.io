//--------Global Variables--------



const board = document.getElementById("board").getContext("2d");
const nextBoard = document.getElementById("nextboard").getContext("2d");
const pieceData = [null,
    [
        [[0, 1], [1, 1], [2, 1], [3, 1]], 
        [[2, 0], [2, 1], [2, 2], [2, 3]], 
        [[0, 2], [1, 2], [2, 2], [3, 2]], 
        [[1, 0], [1, 1], [1, 2], [1, 3]]
    ], 
    [
        [[0, 0], [0, 1], [1, 1], [2, 1]], 
        [[1, 0], [2, 0], [1, 1], [1, 2]], 
        [[0, 1], [1, 1], [2, 1], [2, 2]], 
        [[1, 0], [1, 1], [0, 2], [1, 2]]
    ], 
    [
        [[2, 0], [0, 1], [1, 1], [2, 1]], 
        [[1, 0], [1, 1], [1, 2], [2, 2]], 
        [[0, 1], [1, 1], [2, 1], [0, 2]], 
        [[0, 0], [1, 0], [1, 1], [1, 2]]
    ], 
    [
        [[1, 0], [1, 1], [2, 0], [2, 1]], 
        [[1, 0], [1, 1], [2, 0], [2, 1]], 
        [[1, 0], [1, 1], [2, 0], [2, 1]], 
        [[1, 0], [1, 1], [2, 0], [2, 1]]
    ], 
    [
        [[1, 0], [2, 0], [0, 1], [1, 1]], 
        [[1, 0], [1, 1], [2, 1], [2, 2]], 
        [[1, 1], [2, 1], [0, 2], [1, 2]], 
        [[0, 0], [0, 1], [1, 1], [1, 2]]
    ], 
    [
        [[1, 0], [0, 1], [1, 1], [2, 1]], 
        [[1, 0], [1, 1], [1, 2], [2, 1]], 
        [[0, 1], [1, 1], [2, 1], [1, 2]], 
        [[1, 0], [0, 1], [1, 1], [1, 2]]
    ], 
    [
        [[0, 0], [1, 0], [1, 1], [2, 1]], 
        [[2, 0], [1, 1], [2, 1], [1, 2]], 
        [[0, 1], [1, 1], [1, 2], [2, 2]], 
        [[1, 0], [0, 1], [1, 1], [0, 2]]
]];

let alive = true;
let grid = []
let keyBinds = ["w", "s", "a", "d", "j", "k"]
let keyPressed = [false, false, false, false, false, false];
let key = [0, 0, 0, 0, 0, 0];
let pieceX = 3;
let pieceY = 2;
let pieceRot = 0;
let pieceType = 3;
let colorPalette = [null, "#bbbbff", "#0000dd", "#ff8800", "#ffff00", "#00dd00", "#dd00dd", "#ff0000"]
for (let i = 0; i < 22; i++) {
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}



//------------Setup---------------



addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
        case keyBinds[0]:
            keyPressed[0] = true;
            break;
        case keyBinds[1]:
            keyPressed[1] = true;
            break;
        case keyBinds[2]:
            keyPressed[2] = true;
            break;
        case keyBinds[3]:
            keyPressed[3] = true;
            break;
        case keyBinds[4]:
            keyPressed[4] = true;
            break;
        case keyBinds[5]:
            keyPressed[5] = true;
            break;
    }
});

addEventListener("keyup", (e) => {
    switch (e.key) {
        case keyBinds[0]:
            keyPressed[0] = false;
            break;
        case keyBinds[1]:
            keyPressed[1] = false;
            break;
        case keyBinds[2]:
            keyPressed[2] = false;
            break;
        case keyBinds[3]:
            keyPressed[3] = false;
            break;
        case keyBinds[4]:
            keyPressed[4] = false;
            break;
        case keyBinds[5]:
            keyPressed[5] = false;
            break;
    }
})



//------------Functions-----------



function print(t) {
    document.getElementById("console").innerHTML = t;
}



function rand(min, max) {
    return Math.floor(Math.random() * max - min) + min;
}



function input() {
    for (let i = 0; i < 6; i++) {
        if (keyPressed[i]) {
            key[i]++;
        } else {
            key[i] = 0;
        }
    }
}



function move() {
    if (((key[3] > 12 && key[3] % 4 === 1) || key[3] === 1) && key[2] === 0) {
        pieceX++;
    }
    if (((key[2] > 12 && key[2] % 4 === 1) || key[2] === 1) && key[3] === 0) {
        pieceX--;
    }
    if (((key[5] > 12 && key[5] % 4 === 1) || key[5] === 1) && key[4] === 0) {
        pieceRot += 5;
        pieceRot %= 4;
    }
    if (((key[4] > 12 && key[4] % 4 === 1) || key[4] === 1) && key[5] === 0) {
        pieceRot += 3;
        pieceRot %= 4;
    }
}



function draw_tile(x, y, color) {
    if (y > 1) {
        board.fillStyle = colorPalette[color];
        board.fillRect(x * 32, (y - 2) * 32, 32, 32);
    }
}



function draw_piece(x, y, type, rotation) {
    for (let i = 0; i < 4; i++) {
        draw_tile(x + pieceData[type][rotation][i][0], y + pieceData[type][rotation][i][1], type);
    }
}

next_piece(6)

function next_piece(type) {
    let offsetX = 16;
    let offsetY = 32;
    switch (type) {
        case 1:
            offsetX = 0;
            offsetY = 16;
            break;
        case 4:
            offsetX = 0;
            break;
    }
    nextBoard.clearRect(0, 0, 128, 128);
    if (type !== 0) {
        for (let i = 0; i < 4; i++) {
            nextBoard.fillStyle = colorPalette[type];
            nextBoard.fillRect(offsetX + pieceData[type][0][i][0] * 32, 
                offsetY + pieceData[type][0][i][1] * 32, 32, 32);
        }
    }
}

function render() {
    board.clearRect(0, 0, 640, 1280)
    for (let y = 2; y < 22; y++) {
        for (let x = 0; x < 10; x++) {
            const color = grid[y][x]
            if (color !== 0) {
                tile(x, y, color);
            }
        }
    }
    draw_piece(pieceX, pieceY, pieceType, pieceRot);
}

//start();

async function start() {
    let prevTime = 0;
    let frame = 0
    while (alive) {
        prevTime = Date.now()
        input();
        move();
        render();
        frame++;
        frame %= 60;
        print(frame)
        await new Promise(m => setTimeout(m, 16.6 - (Date.now() - prevTime)));
    }
}

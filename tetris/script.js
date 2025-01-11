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
    let bgMusic = document.getElementById("0");
    const sfx = document.getElementsByClassName("sfx");
    bgMusic.volume = 1;
const keyInput = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 
    'F11', 'F12', 'Insert', 'Delete', 'MediaPlayPause', 'MediaStop', 
    'MediaTrackPrevious', 'MediaTrackNext', '`', '1', '2', '3', '4', '5', '6', 
    '7', '8', '9', '0', '-', '=', 'Backspace', 'NumLock', '~', '!', '@', '#', 
    '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Tab', 'q', 'w', 'e', 'r', 't', 
    'y', 'u', 'i', 'o', 'p', '[', ']', '\\', '{', '}', '|', 'CapsLock', 'a', 's', 
    'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', ':', '"', 'Shift', 'z', 
    'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '<', '>', '?', 'Control', 'Meta', 
    'Alt', ' ', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Home', 'PageUp', 
    'PageDown', 'End', 'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp'];
const keyOutput = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 
    'F11', 'F12', 'INSERT', 'DELETE', 'MEDIA PLAY', 'MEDIA STOP', 
    'MEDIA PREVIOUS', 'MEDIA NEXT', 'BACKTICK', '1', '2', '3', '4', '5', '6', 
    '7', '8', '9', '0', '-', '=', 'BACKSPACE', 'NUMLOCK', 'TILDE', '!', '@', '#', 
    '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Tab', 'Q', 'W', 'E', 'R', 'T', 
    'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', '{', '}', '|', 'CAPSLOCK', 'A', 'S', 
    'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', ':', '"', 'SHIFT', 'Z', 
    'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '<', '>', '?', 'CONTROL', 'META', 
    'ALT', 'SPACE', 'LEFT', 'UP', 'DOWN', 'RIGHT', 'HOME', 'PAGE UP', 
    'PAGE DOWN', 'END', 'MUTE', 'VOLUME DOWN', 'VOLUME UP']
const speeds = [48, 43, 38, 33, 28, 23, 18, 13, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

//localStorage variables and settings

let highScore = 0;
if (localStorage.getItem("highscore") !== null) {
    highScore = JSON.parse(localStorage.getItem("highscore"));
} 
let keyBinds = ["w", "s", "a", "d", "j", "k", " "];
if (localStorage.getItem("binds") !== null) {
    keyBinds = JSON.parse(localStorage.getItem("binds"));
} 
let colorPalette = [null, "#bbbbff", "#0000dd", "#ff8800", "#ffff00", "#00dd00", "#dd00dd", "#ff0000"];
if (localStorage.getItem("colors") !== null) {
    colorPalette = JSON.parse(localStorage.getItem("colors"));
} 
let vol = [100, 100, 100];
if (localStorage.getItem("vols") !== null) {
    vol = JSON.parse(localStorage.getItem("vols"));
} 

//Game variables

let started = false;
let speed = 48;
let downFrame = 0;
let queuedPoints = 0;
let queuedLines = [];
let animationFrame = 0;
let score = 0;
let lines = 0;
let level = 0;
let selectedLevel = 0;
let animating = false;
let alive = true;
let paused = false;
let settings = false;
let grid = [];
let bag = [];
let keyFocus = null;
let keyPressed = [false, false, false, false, false, false];
let key = [0, 0, 0, 0, 0, 0];
let pieceX = 3;
let pieceY = 0;
let pieceRot = 0;
randomize_bag();
let pieceType = bag[0];
next_piece(bag[1])

for (let i = 0; i < 22; i++) {
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

setup_settings();
apply_settings();



//------------Setup---------------



addEventListener("keydown", (e) => {
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
        case keyBinds[6]:
            if (started) {
                if (paused) {
                    paused = false;
                    manage("pause", "close");
                    bgMusic.play();
                } else {
                    if (alive && !settings) {
                        paused = true;
                        manage("pause", "open");
                        bgMusic.pause();
                    }
                }
            }
            break;
    }
    if (keyFocus !== null) {
        document.getElementsByClassName("keybinds")[keyFocus].innerHTML = keyInput.indexOf(e.key);
        keyBinds[keyFocus] = e.key
        document.getElementsByClassName("keybinds")[keyFocus].innerHTML = keyOutput[keyInput.indexOf(e.key)];
        keyFocus = null;
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



function setup_settings() {
    for (let i = 0; i < 7; i++) {
        document.getElementsByClassName("keybinds")[i].innerHTML = keyOutput[keyInput.indexOf(keyBinds[i])];
    }
    for (let i = 0; i < 7; i++) {
        document.getElementsByClassName("colinp")[i].value = colorPalette[i + 1]
    }
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("sound-range")[i].value = vol[i]
    }
}



function apply_settings() {
    for (let i = 0; i < 7; i++) {
        keyBinds[i] = keyInput[keyOutput.indexOf(document.getElementsByClassName("keybinds")[i].innerHTML)];
    }
    localStorage.setItem("binds", JSON.stringify(keyBinds));
    for (let i = 0; i < 7; i++) {
        colorPalette[i + 1] = document.getElementsByClassName("colinp")[i].value; 
    }
    localStorage.setItem("colors", JSON.stringify(colorPalette));
    for (let i = 0; i < 3; i++) {
        vol[i] = document.getElementsByClassName("sound-range")[i].value;
    }
    localStorage.setItem("vols", JSON.stringify(vol));
    bgMusic.volume = (vol[0] / 100) * (vol[1] / 100);
}



function manage(focus, action) {
    const f = document.getElementById(focus)
    switch (action) {
        case "open":
            if (focus === "settings") {
                bgMusic.pause();
                setup_settings();
                settings = true;
            } else if (focus === "title-page") {
                started = false;
                bgMusic.pause();
            }
            f.style.display = "initial";
            break;
        case "close":
            if (focus === "settings") {
                settings = false;
                apply_settings();
                next_piece(bag[1]);
            }
            f.style.display = "none";
            break;
    }
}



function sfx_play(which) {
    sfx[which].currentTime = 0;
    sfx[which].play();
}



function retry() {
    bgMusic.currentTime = 0;
    bgMusic.play();
    grid = [];
    for (let i = 0; i < 22; i++) {
        grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    started = true;
    bag = [];
    randomize_bag();
    pieceX = 3;
    pieceY = 0;
    pieceRot = 0;
    pieceType = bag[0];
    score = 0;
    level = 0;
    lines = 0;
    downFrame = 0;
    alive = true;
    next_piece(bag[1]);
}



function defaults(type) {
    switch (type) {
        case "controls":
            keyBinds = ["w", "s", "a", "d", "j", "k", " "];
            for (let i = 0; i < 7; i++) {
                document.getElementsByClassName("keybinds")[i].innerHTML = keyOutput[keyInput.indexOf(keyBinds[i])];
            }
            break;
        case "colors":
            colorPalette = [null, "#bbbbff", "#0000dd", "#ff8800", "#ffff00", "#00dd00", "#dd00dd", "#ff0000"];
            for (let i = 0; i < 7; i++) {
                document.getElementsByClassName("colinp")[i].value = colorPalette[i + 1];
            }
            break;
        case "sound":
            vol = [100, 100, 100]
            for (let i = 0; i < 3; i++) {
                document.getElementsByClassName("sound-range")[i].value = vol[i];
            }
            break;
    }
}



function rand(min, max) {
    return Math.floor(Math.random() * max - min) + min;
}



function randomize_bag() {
    let cand = [1, 2, 3, 4, 5, 6, 7];
    let b = [];
    for (let i = 0; i < 7; i++) {
        const r = rand(0, cand.length);
        b.push(cand[r])
        cand.splice(r, 1);
    }
    bag = [...bag, ...b];
    return b;
}



function check_lines() {
    queuedLines = [];
    for (let i = 0; i < 22; i++) {
        if (!grid[i].includes(0)) {
            queuedLines.push(i);
        }
    }
}



function clear_lines() {
    let cleared = 0;
    for (let i = 0; i < queuedLines.length; i++) {
        grid.splice(queuedLines[i], 1);
        grid.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        cleared++;
        lines++;
        level = Math.max(Math.floor(lines / 10), selectedLevel);
        if (level < 29) {
            speed = speeds[level];
        } else {
            speed = 1;
        }
    }
    sfx_play(3)
    score += [0, 40, 100, 300, 1200][cleared] * (level + 1);
}



function gridMap(x, y) {
    if (x >= 0 && x <= 9 && y >= 0 && y <= 21) {
        return grid[y][x];
    } else {
        return undefined;
    }
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



function test(dir) {
    const checkPos = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
    switch (dir) {
        case "down":
            for (let i = 0; i < 4; i++) {
                if (gridMap(pieceData[pieceType][pieceRot][i][0] + pieceX, pieceData[pieceType][pieceRot][i][1] + pieceY + 1) !== 0
                    || pieceData[pieceType][pieceRot][i][1] + pieceY > 20) {
                    return false;
                }
            }
            return true;
        case "left":
            for (let i = 0; i < 4; i++) {
                if (grid[pieceData[pieceType][pieceRot][i][1] + pieceY][pieceData[pieceType][pieceRot][i][0] + pieceX - 1] !== 0
                    || pieceData[pieceType][pieceRot][i][0] + pieceX < 1) {
                    return false;
                }
            }
            return true;
        case "right":
            for (let i = 0; i < 4; i++) {
                if (grid[pieceData[pieceType][pieceRot][i][1] + pieceY][pieceData[pieceType][pieceRot][i][0] + pieceX + 1] !== 0
                    || pieceData[pieceType][pieceRot][i][0] + pieceX > 9) {
                    return false;
                }
            }
            return true;
        case "cw":
            for (let j = 0; j < 9; j++) {
                valid = true;
                for (let i = 0; i < 4; i++) {
                    if (pieceData[pieceType][(pieceRot + 5) % 4][i][0] + pieceX + checkPos[j][0] > 9
                        || pieceData[pieceType][(pieceRot + 5) % 4][i][0] + pieceX + checkPos[j][0] < 0
                        || pieceData[pieceType][(pieceRot + 5) % 4][i][1] + pieceY + checkPos[j][1] > 21
                        || pieceData[pieceType][(pieceRot + 5) % 4][i][1] + pieceY + checkPos[j][1] < 0
                    ) {
                        valid = false;
                        break;
                    } else {
                        if (grid[pieceData[pieceType][(pieceRot + 5) % 4][i][1] + pieceY + checkPos[j][1]][pieceData[pieceType][(pieceRot + 5) % 4][i][0] + pieceX + checkPos[j][0]] !== 0) {
                            valid = false;
                            break;
                        }
                    }
                }
                if (valid) {
                    pieceX += checkPos[j][0];
                    pieceY += checkPos[j][1];
                    return true;
                }
            }
            return false;
        case "ccw":
            for (let j = 0; j < 9; j++) {
                valid = true;
                for (let i = 0; i < 4; i++) {
                    if (pieceData[pieceType][(pieceRot + 3) % 4][i][0] + pieceX + checkPos[j][0] > 9
                        || pieceData[pieceType][(pieceRot + 3) % 4][i][0] + pieceX + checkPos[j][0] < 0
                        || pieceData[pieceType][(pieceRot + 3) % 4][i][1] + pieceY + checkPos[j][1] > 21
                        || pieceData[pieceType][(pieceRot + 3) % 4][i][1] + pieceY + checkPos[j][1] < 0
                    ) {
                        valid = false;
                        break;
                    } else {
                        if (grid[pieceData[pieceType][(pieceRot + 3) % 4][i][1] + pieceY + checkPos[j][1]][pieceData[pieceType][(pieceRot + 3) % 4][i][0] + pieceX + checkPos[j][0]] !== 0) {
                            valid = false;
                            break;
                        }
                    }
                }
                if (valid) {
                    pieceX += checkPos[j][0];
                    pieceY += checkPos[j][1];
                    return true;
                }
            }
            return false;
    }
}



function move() {
    if (((key[3] > 12 && key[3] % 4 === 1) || key[3] === 1) && key[2] === 0 && test("right")) {
        pieceX++;
        sfx_play(0)
    }
    if (((key[2] > 12 && key[2] % 4 === 1) || key[2] === 1) && key[3] === 0 && test("left")) {
        pieceX--;
        sfx_play(0)
    }
    if ((key[5] === 1) && key[4] === 0 && test("cw")) {
        pieceRot += 5;
        pieceRot %= 4;
        sfx_play(1)
    }
    if ((key[4] === 1) && key[5] === 0 && test("ccw")) {
        pieceRot += 3;
        pieceRot %= 4;
        sfx_play(1)
    }
    if ((key[1] % 4 === 1 || downFrame >= speed)) {
        if (test("down")) {
            if (key[1] % 4 === 1) {
                queuedPoints++;
            }
            pieceY++;
            downFrame = 0;
        } else {
            conv_piece();
        }
    }
    if (key[0] === 1) {
        while (test("down")) {
            pieceY++;
            queuedPoints += 2;
        }
        conv_piece();
        downFrame = 0;
    }
}



function conv_piece() {
    for (let i = 0; i < 4; i++) {
        grid[pieceData[pieceType][pieceRot][i][1] + pieceY][pieceData[pieceType][pieceRot][i][0] + pieceX] = pieceType;
    }
    sfx_play(2);
    pieceX = 3;
    pieceY = 0;
    bag.splice(0, 1);
    if (bag.length < 7) {
        randomize_bag();
    }
    check_lines();
    if (queuedLines.length > 0) {
        animating = true;
    } else {
        score += queuedPoints;
        queuedPoints = 0;
    }
    check_end();
    if (!alive) {
        manage("game-over-con", "open");
        settings = true;
        bgMusic.pause();
        bgMusic.currentTime = 0;
    } else {
        pieceType = bag[0];
        next_piece(bag[1]);
        pieceRot = 0;
    }
}



function check_end() {
    for (let i = 0; i < 30; i++) {
        if (grid[Math.floor(i / 10)][i % 10] !== 0) {
            alive = false;
	    started = false;
            document.getElementById("end-score").innerHTML = score;
            if (score > highScore) {
                document.getElementById("highscore").innerHTML = "NEW HIGHSCORE!";
                highScore = score;  
                localStorage.setItem("highscore", JSON.stringify(highScore));
            } else {
                document.getElementById("highscore").innerHTML = `HIGHSCORE: ${highScore}`;
            }
            return true;
        } 
    }
    return false;
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
            nextBoard.fillRect(offsetX + pieceData[type][0][i][0] * 32, offsetY + pieceData[type][0][i][1] * 32, 32, 32);
        }
    }
}



function render() {
    board.clearRect(0, 0, 640, 1280);
    for (let y = 2; y < 22; y++) {
        for (let x = 0; x < 10; x++) {
            const color = grid[y][x];
            if (color !== 0) {
                draw_tile(x, y, color);
            }
        }
    }
    draw_piece(pieceX, pieceY, pieceType, pieceRot);
    document.getElementById("scoreout").innerHTML = score;
    document.getElementById("levelout").innerHTML = level;
    document.getElementById("linesout").innerHTML = lines;
}



function animate(frame, lines) {
    const loc = [[4, 5], [3, 6], [2, 7], [1, 8], [0, 9]];
    for (let i = 0; i < lines.length; i++) {
        grid[lines[i]][loc[Math.floor(frame / 6)][0]] = 0;
        grid[lines[i]][loc[Math.floor(frame / 6)][1]] = 0;
    }
    if (frame === 4 ) {
        lines.length < 4 ? sfx_play(4) : sfx_play(5);
    }
}



function game_loop() {
    if (alive) {
        selectedLevel = Number(document.getElementById("start-level").value);
        level = selectedLevel;
        speed = speeds[selectedLevel];
        selectedLevel > 19 || selectedLevel < 0 ? selectedLevel = 0 : null;
        bgMusic = document.getElementById(document.getElementById("bgmusic").value);
        if (!paused && !settings) {
            if (!animating) {
                input();
                move();
                render();
                downFrame++;
                if (downFrame >= speed) {
                    randomize_bag();
                }
            } else {
                animate(animationFrame, queuedLines);
                render();
                animationFrame++;
                if (animationFrame > 29) {
                    animating = false;
                    animationFrame = 0;
                    score += queuedPoints;
                    queuedPoints = 0;
                    clear_lines();
                }
            }
        }
        if (alive) {
            window.requestAnimationFrame(game_loop)
        } else {
            bgMusic.pause();
        }
    }
}

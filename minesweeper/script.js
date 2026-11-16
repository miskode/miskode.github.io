const canvas = document.querySelector("#board");
const board = canvas.getContext("2d");
const flag_img = document.querySelector("#flag_img");
const mine_img = document.querySelector("#mine_img");
const scale = 70;
const colors = {
    border: "#303030",
    dark_hidden: "#404040",
    light_hidden: "#484848",
    dark_revealed: "#989898",
    light_revealed: "#a0a0a0",
    mine_bg: "#282828",
    mouse_light: "#b0b0b0",
    mouse_dark: "#585858",
    text: [
        "#0000ff",
        "#007800",
        "#ff0000",
        "#800080",
        "#800000",
        "#008080",
        "#000000",
        "#808080"
    ]
}

let num_of_mines = 0;
let num_of_flags = 0;
let time = 0;
let grid_size = {x: 16, y: 16, total: 256};
let mouse_tile = {x: 0, y: 0};
let has_dug = false;
let alive = true;
let difficulty = "medium";
let mines_shown = Array(256).fill(false);
let flagged = Array(256).fill(false);
let revealed = Array(256).fill(false);
let grid = Array(256).fill("0");

document.querySelector("#difficulty").addEventListener("change", (e) => {
    if (document.querySelector("#difficulty").value === "custom" && difficulty !== "custom") {
        Utils.manage_page("custom", "open");
    } else if (document.querySelector("#difficulty").value !== "custom" && difficulty === "custom") {
        Utils.manage_page("custom", "close");
    }
    difficulty = document.querySelector("#difficulty").value;
});

addEventListener("mousemove", (e) => {
    let r = canvas.getBoundingClientRect();
    mouse_tile.x = Math.floor((e.clientX - r.left - 5) / scale * 2);
    mouse_tile.y = Math.floor((e.clientY - r.top - scale - 5) / scale * 2) + 1;
    render();
});

canvas.addEventListener("mousedown", (e) => {
    if (alive) {
        switch (e.button) {
            case 0:
                if (!has_dug) {
                    do {
                        grid = Array(grid_size.y * grid_size.x).fill("0")
                        set_grid(grid_size.x, grid_size.y);
                    } while (grid[mouse_tile.y * grid_size.x + mouse_tile.x] !== "0");
                    has_dug = true;
                    setTimeout(timer, 1000);
                }
                dig(mouse_tile.x, mouse_tile.y);
                break;
            case 2:
                flag(mouse_tile.x, mouse_tile.y);
                break;
            case 1:
                chord(mouse_tile.x, mouse_tile.y);
                break;
        }
        render();
    }
});

addEventListener("keydown", (e) => {
    if (alive) {
        switch (e.key) {
            case "c":
                if (!has_dug) {
                    do {
                        grid = Array(grid_size.y * grid_size.x).fill("0")
                        set_grid(grid_size.x, grid_size.y);
                    } while (grid[mouse_tile.y * grid_size.x + mouse_tile.x] !== "0");
                    has_dug = true;
                }
                dig(mouse_tile.x, mouse_tile.y);
                break;
            case "z":
                flag(mouse_tile.x, mouse_tile.y);
                break;
            case "x":
                chord(mouse_tile.x, mouse_tile.y);
                break;
        }
        render();
    }
});

class Utils {
    static manage_page(id, action) {
        if (action === "close") {
            document.querySelector("#" + id).classList.add("hidden");
            if (id === "gameover-page") {
                document.querySelector("#gameover-page").classList.remove("fadein");
            }
        } else {
            document.querySelector("#" + id).classList.remove("hidden");
            if (id === "gameover-page") {
                document.querySelector("#gameover-page").classList.add("fadein");
            }
        }
    }

    static randint(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    static print_grid() {
        let t = "";
        for (let i = 0; i < grid_size.total; i++) {
            if (i % grid_size.x === 0) {
                t += "\n";
            }
            t += `${grid[i] === "0" ? " " : (grid[i] === "X" ? "\u2588" : grid[i])} `;
        }   // Replaces certain characters to make them more legible when printed
        console.log(t);
    }

    static line(x1, y1, x2, y2) {
        board.moveTo(x1, y1);
        board.lineTo(x2, y2);
    }

    static three_digit_format(x) {
        x = Math.abs(x);
        if (x > 999) {
            return "999";
        }
        return `${Math.floor(x % 1000 / 100)}${Math.floor(x % 100 / 10)}${x % 10}`;
    }

    static dist_from_mouse(x, y) {
        return Math.sqrt((mouse_tile.x - x) ** 2 + (mouse_tile.y - y) ** 2);
    }
}

function get_grid_size() {
    if (difficulty !== "custom") {
        switch (difficulty) {
            case "easy":
                grid_size.x = 9;
                grid_size.y = 9;
                num_of_mines = 10;
                break;
            case "medium":
                grid_size.x = 16;
                grid_size.y = 16;
                num_of_mines = 40;
                break;
            case "hard":
                grid_size.x = 30;
                grid_size.y = 16;
                num_of_mines = 99;
        }
        num_of_flags = num_of_mines;
        grid_size.total = grid_size.x * grid_size.y;
        return;
    }

    if (!Number.isNaN(parseInt(document.querySelector("#num_of_cols").value, 10))) {
        grid_size.x = parseInt(document.querySelector("#num_of_cols").value, 10);
    }
    if (!Number.isNaN(parseInt(document.querySelector("#num_of_rows").value, 10))) {
        grid_size.y = parseInt(document.querySelector("#num_of_rows").value, 10);
    }
    grid_size.total = grid_size.x * grid_size.y;
    if (!Number.isNaN(parseInt(document.querySelector("#num_of_mines").value, 10))) {
        num_of_mines = parseInt(document.querySelector("#num_of_mines").value), 10;
    } else {
        num_of_mines = Math.min(Math.round((0.23 * grid_size.total ** 2 + 93.8 * grid_size.total + 893.7) / 1000), 
        Math.round(0.2065 * grid_size.total));
    }

    num_of_flags = num_of_mines;
}

function set_grid() {
    mines_shown = Array(grid_size.total).fill(false);
    grid = Array(grid_size.total).fill("0");
    let empty_grid = [];
    for (let i = 0; i < grid_size.total; i++) {
        empty_grid.push(i)
    }

    for (let i = 0; i < num_of_mines; i++) {
        const x = Utils.randint(0, empty_grid.length);
        grid[empty_grid[x]] = "X";

        for (let j of [-1 * grid_size.x - 1, -1 * grid_size.x, -1 * grid_size.x + 1, -1, 1, grid_size.x - 1, grid_size.x, grid_size.x + 1]) {
            if (j + empty_grid[x] < 0 || j + empty_grid[x] > grid_size.total - 1) {
                continue;   // Candidate grid square is off the grid
            }

            if (Math.abs((j + empty_grid[x]) % grid_size.x - empty_grid[x] % grid_size.x) > 1) {
                continue;   // Candidate grid square crosses borders
            }

            if (grid[j + empty_grid[x]] !== "X") {
                grid[j + empty_grid[x]] = (+ (grid[j + empty_grid[x]]) + 1).toString();
            }
        }

        empty_grid.splice(x, 1);
    }
}

function dig(x, y) {
    const target = y * grid_size.x + x;
    if (revealed[target] || flagged[target]) {
        return;
    }
    if (grid[target] === "0") {
        revealed[target] = true;
        for (let j of [-1 * grid_size.x - 1, -1 * grid_size.x, -1 * grid_size.x + 1, -1, 1, grid_size.x - 1, grid_size.x, grid_size.x + 1]) {
            if (j + target < 0 || j + target > grid_size.total - 1) {
                continue;   // Candidate grid square is off the grid
            }

            if (Math.abs((j + target) % grid_size.x - target % grid_size.x) > 1) {
                continue;   // Candidate grid square crosses borders
            }
            
            setTimeout(dig, 25, (j + target) % grid_size.x, Math.floor((j + target) / grid_size.x));
        }
    } else if (grid[target] === "X") {
        game_over();
    } else {

        revealed[target] = true;
    }
    
    if (check_win()) {
        win();
    }

    render();
}

function chord(x, y) {
    const target = y * grid_size.x + x;
    if (grid[target] === "0" || grid[target] === "X" || !revealed[target]) {
        console.log("Not valid chord square")
        return;
    }

    let counted_flags = 0;

    for (let j of [-1 * grid_size.x - 1, -1 * grid_size.x, -1 * grid_size.x + 1, -1, 1, grid_size.x - 1, grid_size.x, grid_size.x + 1]) {
        if (j + target < 0 || j + target > grid_size.total - 1) {
            continue;   // Candidate grid square is off the grid
        }

        if (Math.abs((j + target) % grid_size.x - target % grid_size.x) > 1) {
            continue;   // Candidate grid square crosses borders
        }
        
        if (flagged[j + target]) {
            counted_flags++;
        }
    }

    if (counted_flags.toString() !== grid[target]) {
        return;
    }

    for (let j of [-1 * grid_size.x - 1, -1 * grid_size.x, -1 * grid_size.x + 1, -1, 1, grid_size.x - 1, grid_size.x, grid_size.x + 1]) {
        if (j + target < 0 || j + target > grid_size.total - 1) {
            continue;   // Candidate grid square is off the grid
        }

        if (Math.abs((j + target) % grid_size.x - target % grid_size.x) > 1) {
            continue;   // Candidate grid square crosses borders
        }
        
        dig((j + target) % grid_size.x, Math.floor((j + target) / grid_size.x));
    }    
}

function flag(x, y) {
    const candidate = y * grid_size.x + x;
    if (revealed[candidate]) {
        return;
    }
    if (flagged[candidate]) {
        flagged[candidate] = false;
        num_of_flags++;
    } else {
        if (num_of_flags < 1) { return; }
        flagged[candidate] = true;
        num_of_flags--;
    }
}

function timer() {
    if (alive) {
        time++;
        setTimeout(timer, 1000);
        render();
    }
}

function check_win() {
    for (let i = 0; i < grid_size.total; i++) {
        if (grid[i] === "X") {
            if (revealed[i]) { return false }
        } else {
            if (!revealed[i]) { return false }
        }
    }
    return true;
}

function win() {
    alive = false;
    document.querySelector("#won").innerText = "You Win!";
    document.querySelector("#time").innerText = `Time: ${time}`;
    Utils.manage_page("gameover-page", "open");
}

function game_over() {
    const delay = 25;
    console.log("you died :(");
    alive = false;
    let m_list = [];
    for (let i = 0; i < grid_size.total; i++) {
        if (grid[i] === "X") {
            m_list.push([Utils.dist_from_mouse(i % grid_size.x, Math.floor(i / grid_size.x)), 
                i % grid_size.x, Math.floor(i / grid_size.x)]);
        }
    }
    m_list.sort((a, b) => a[0] - b[0]);
    let i = 0;
    for (let x of m_list) {
        setTimeout(explode, i * delay, x[2] * grid_size.x + x[1]);
        i++;
    }

    document.querySelector("#won").innerText = "Game Over";
    document.querySelector("#time").innerText = "";
    setTimeout(Utils.manage_page, (num_of_mines + 1) * delay, "gameover-page", "open");
}

function explode(index) {
    mines_shown[index] = true;
    render();
}

function retry() {
    Utils.manage_page("gameover-page", "close");
    has_dug = false;
    alive = true;
    mines_shown = Array(256).fill(false);
    flagged = Array(256).fill(false);
    revealed = Array(256).fill(false);
    grid = Array(256).fill("0");
    num_of_flags = num_of_mines;
    time = 0;
    render();
}

function home() {
    Utils.manage_page("gameover-page", "close");
    Utils.manage_page("game-page", "close");
    Utils.manage_page("start-page", "open");
    has_dug = false;
    alive = true;
    mines_shown = Array(256).fill(false);
    flagged = Array(256).fill(false);
    revealed = Array(256).fill(false);
    grid = Array(256).fill("0");
    num_of_flags = num_of_mines;
    time = 0;
}

function draw_revealed_squares() {
    for (let x = 0; x < grid_size.x; x++) {
        for (let y = 0; y < grid_size.y; y++) {
            if (!revealed[y * grid_size.x + x]) {
                continue;
            }
            if (x % 2 === y % 2) {
                board.fillStyle = colors.light_revealed;
            } else {
                board.fillStyle = colors.dark_revealed;
            }
            if (x === mouse_tile.x && y === mouse_tile.y) {
                    board.fillStyle = colors.mouse_light;
                }
            board.fillRect(x * scale, (y + 1) * scale, scale, scale);
        }
    }
}

function draw_hidden_squares() {
    for (let x = 0; x < grid_size.x; x++) {
        for (let y = 0; y < grid_size.y; y++) {
            if (!revealed[y * grid_size.x + x]) {
                if (x % 2 === y % 2) {
                    board.fillStyle = colors.light_hidden;
                } else {
                    board.fillStyle = colors.dark_hidden;
                }

                if (!alive && grid[y * grid_size.x + x] === "X" && mines_shown[y * grid_size.x + x]) {
                    board.fillStyle = colors.mine_bg;
                }

                if (x === mouse_tile.x && y === mouse_tile.y) {
                    board.fillStyle = colors.mouse_dark;
                }

                board.fillRect(x * scale, y * scale + scale, scale, scale);
            }

            if (flagged[y * grid_size.x + x] && 
                !(grid[y * grid_size.x + x] === "X" && !alive && mines_shown[y * grid_size.x + x])) {
                board.drawImage(flag_img, x * scale + Math.round(scale * 0.125), 
                y * scale + Math.round(scale * 1.125), 
                Math.round(scale * 0.75), 
                Math.round(scale * 0.75));
            } else if (revealed[y * grid_size.x + x]) {
                if (grid[y * grid_size.x + x] === "0") {
                    continue;
                }
                board.fillStyle = colors.text[grid[y * grid_size.x + x] - 1];
                board.fillText(grid[y * grid_size.x + x],
                    x * scale + Math.round(scale / 4),
                    (y + 1) * scale + Math.round(scale / 4));
            } else if (grid[y * grid_size.x + x] === "X" && !alive && mines_shown[y * grid_size.x + x]) {
                board.drawImage(mine_img, x * scale, 
                (y + 1) * scale, scale, scale);
            }
        }
    }
}

function render() {
    const w = 6;
    board.clearRect(0, 0, grid_size.x * scale, grid_size.y * scale + scale);
    board.font = `600 ${Math.round(scale * 0.85)}px Roboto`;
    board.textBaseline = "hanging";

    board.strokeStyle = colors.border;
    board.lineWidth = w;

    draw_revealed_squares();

    for (let x = 0; x < grid_size.x; x++) {
        for (let y = 0; y < grid_size.y; y++) {
            if (revealed[y * grid_size.x + x]) {
                continue;
            }
            board.strokeRect(x * scale - w / 2, (y + 1) * scale - w / 2, scale + w, scale + w);
        }
    }

    draw_hidden_squares();

    board.fillStyle = "#000000";
    board.fillRect(0, 0, scale * grid_size.x, scale);
    board.drawImage(flag_img, Math.round(scale * 0.125), Math.round(scale * 0.125), 
    Math.round(scale * 0.75), Math.round(scale * 0.75));
    board.fillStyle = "#ffffff";
    board.fillText(Utils.three_digit_format(num_of_flags), scale, Math.round(scale / 4));
    board.fillText(Utils.three_digit_format(time), scale * grid_size.x - scale * 1.6, Math.round(scale / 4));
}

function start() {
    get_grid_size();
    canvas.width = grid_size.x * scale;
    canvas.height = grid_size.y * scale + scale;
    Utils.manage_page("start-page", "close");
    Utils.manage_page("game-page", "open");
    render();
}

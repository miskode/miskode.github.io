const canvas = document.querySelector("#screen");
screen = canvas.getContext("2d");
const dvd_Img = new Image();
dvd_Img.src = "./dvd-logo-small.png";

let x = 0;
let y = 0;
let speed = 3;
let angle = 315;
let colorMode = "color";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            speed *= 1.25;
            break;
        case "ArrowDown":
            speed /= 1.25;
            break;
        case " ":
            colorMode = "color";
            speed = 3;
            break;
        case "Shift":
            //console.log("shift");
            colorMode == "color" ? colorMode = "white" : colorMode = "color";
            break;
        case "h":
            //console.log("h");
            window.location = "../index.html";
            break;
    }
})

function randint(x, y) {
    return Math.floor((y - x) * Math.random()) + x;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function move() {
    switch (angle) {
        case 45:
            x += speed;
            y -= speed;
            break;
        case 135:
            x -= speed;
            y -= speed;
            break;
        case 225:
            x -= speed;
            y += speed;
            break;
        case 315:
            x += speed;
            y += speed;
            break;
    }
    if (x < 0) {
        x = 2;
        angle == 225 || angle == 45 ? angle = (angle + 90) % 360 : angle = (angle + 270) % 360;
        randomize_colors();
    } else if (x + 413 > canvas.width) {
        x = canvas.width - 416;
        angle == 225 || angle == 45 ? angle = (angle + 90) % 360 : angle = (angle + 270) % 360;
        randomize_colors();
    }
    if (y < 0) {
        y = 2;
        angle == 225 || angle == 45 ? angle = (angle + 270) % 360 : angle = (angle + 90) % 360;
        randomize_colors();
    } else if (y + 187 > canvas.height) {
        y = canvas.height - 190;
        angle == 225 || angle == 45 ? angle = (angle + 270) % 360 : angle = (angle + 90) % 360;
        randomize_colors();
    }
    //console.log(`${x}\t${y}\t${angle}`);
}

function randomize_colors() {
    rList = [255, randint(0, 256), 0]
    shuffleArray(rList);
}

function render() {
    if (colorMode == "color") {
        screen.fillStyle = `rgb( ${rList[0]} ${rList[1]} ${rList[2]} )`;
    } else {
        screen.fillStyle = "rgb( 255 255 255 )";
    }
    screen.clearRect(0, 0, canvas.width, canvas.height);
    screen.fillRect(x + 0.5, y + 0.5, 412, 186);
    screen.drawImage(dvd_Img, x, y);
}

randomize_colors();
function loop() {
    move();
    render();
    //document.querySelector("#test").innerHTML = `${rList}`;
    requestAnimationFrame(loop);
}

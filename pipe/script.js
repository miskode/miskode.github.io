const pipe = new Audio("pipe.mp3");
pipe.volume = parseInt(document.getElementById("vol").value) / 4;

let min = document.getElementById("min").value * 60000;
let max = document.getElementById("max").value * 60000;
if (min > max) {
    max = min;
    document.getElementById("max").value = document.getElementById("min");
}

function randint(x, y) {
    return Math.floor(Math.random() * (y - x)) + x;
}

function drop() {
    setTimeout(() => {
        drop();
    }, randint(min, max));
    pipe.play();
}
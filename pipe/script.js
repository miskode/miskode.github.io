const pipe = new Audio("pipe.mp3");
pipe.volume = parseInt(document.getElementById("vol").value) / 4;

let min = Math.abs(document.getElementById("min").value * 60000);
let max = Math.abs(document.getElementById("max").value * 60000);
if (min > max) {
    max = min;
    document.getElementById("max").value = document.getElementById("min");
}

function randint(x, y) {
    return Math.floor(Math.random() * (y - x)) + x;
}

function drop() {
    pipe.volume = parseInt(document.getElementById("vol").value) / 4;
    let min = Math.abs(document.getElementById("min").value * 60000);
    let max = Math.abs(document.getElementById("max").value * 60000);
    if (min > max) {
        max = min;
        document.getElementById("max").value = document.getElementById("min");
    }
    setTimeout(() => {
        drop();
    }, randint(min, max));
    pipe.play();
}

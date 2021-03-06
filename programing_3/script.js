var socket = io();

let side = 25;

function setup() {
    createCanvas(25 * side, 25 * side);
    background("#acacac");
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }

}

socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
}
function spawnGrass() {
    socket.emit("add grass")
}
function spawnGrassEater() {
    socket.emit("spawngrassEater")
}
function spawnPredator() {
    socket.emit('spawnPredator');
}
function spawnSunk() {
    socket.emit('spawnSunk');
}
function spawnNapastak() {
    socket.emit('spawnNapastak');
}
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

function generator(matLen, gr, grEat, pr, sk, np) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }

    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    } for (let i = 0; i < sk; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < np; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
        return matrix;
    }
}


matrix = generator(25, 100, 25, 25, 10, 25);

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
SunkArr = [];
NapastakArr = [];

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Napastak = require("./Napastak")
Sunk = require("./Sunk")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y,);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y);
                PredatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var sk = new Sunk(x, y);
                SunkArr.push(sk);
            } else if (matrix[y][x] == 5) {
                var np = new Napastak(x, y);
                NapastakArr.push(np);
            }
            else if (matrix[y][x] == 8) {

            }
        }
    }

    io.sockets.emit('send matrix', matrix)

}
function game() {
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].mul();
        PredatorArr[i].eat();

    }
    for (var i in SunkArr) {
        SunkArr[i].mul();
    }
    for (var i in NapastakArr) {
        NapastakArr[i].mul();
        NapastakArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 400)

io.on('connection', function () {
    createObject(matrix)
})

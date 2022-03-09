var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const Grass = require('./Grass');
const GrassEater = require('./GrassEater');
const Napastak = require('./napastak');
const Predator = require('./Predator');
const Sunk = require('./Sunk');

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

matrix = generator(25, 5, 15, 10, 8, 12);


io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
SunkArr = [];
NapastakArr = [];

Grasss = require("./grass")
GrasssEater = require("./grassEater")
Predatorr = require("./Predator")
Napastakk = require("./napastak")
Sunkk = require("./sunk")

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

function kill() {
    grassArr = [];
    grassEaterArr = []
    PredatorArr = []
    SunkArr = []
    NapastakArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

function spawnGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            PredatorArr.push(new Predator(x, y,))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnSunk() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            SunkArr.push(new Sunk(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnNapastak() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            NapastakArr.push(new Napastak(x, y));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    createObject(matrix)
    socket.on("kill", kill);
    socket.on("add grass", spawnGrass);
    socket.on("spawngrassEater", spawnGrassEater);
    socket.on('spawnPredator', spawnPredator);
    socket.on('spawnSunk', spawnSunk);
    socket.on('spawnNapastak', spawnNapastak);
})

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = PredatorArr.length;
    statistics.Sunk = SunkArr.length;
    statistics.Napastak = NapastakArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)
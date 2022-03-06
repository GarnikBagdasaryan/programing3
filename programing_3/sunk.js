let LivingCreature = require('./LivingCreature')


module.exports = class Sunk extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.multiply = 3;
    }
    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newsk = new Sunk(newX, newY, 1);
            SunkArr.push(newsk);
            this.multiply = 0;
        }
    }


}
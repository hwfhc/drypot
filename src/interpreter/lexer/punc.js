const Sep = require('./sep');

class Punc extends Sep{
    constructor(value){
        super(value);
    }
}

Sep.MATCH = /^({{|}}|\(|\)|,)/;

module.exports = Punc;

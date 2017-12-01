const Token = require('./token');

class Sep extends Token{
    constructor(value){
        super(value);
    }
}

Sep.MATCH = /^({{|}}|\(|\)|,)/;

module.exports = Sep;

const Token = require('./token');

class Quo extends Token{
    constructor(){
        super('`');
    }
}

Quo.MATCH = /^`+/;

module.exports = Quo;

const Token = require('./token');

class Ident extends Token{
    constructor(value){
        super(value);
    }
}

Ident.MATCH = /^[a-zA-Z_]+/;

module.exports = Ident;

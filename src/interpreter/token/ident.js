const Token = require('./token');

class Ident extends Token{
    constructor(value){
        super(value);
    }
}

Ident.MATCH = function(ch){
    return /[a-z_]/i.test(ch);
}

module.exports = Ident;

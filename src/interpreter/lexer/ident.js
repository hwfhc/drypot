const Token = require('./token');
const ENV = require('../env');

class Ident extends Token{
    constructor(value){
        super(value);
    }

    eval(){
        return ENV.scope.get(this.value);
    }
}

Ident.MATCH = /^[a-zA-Z_]+/;

module.exports = Ident;

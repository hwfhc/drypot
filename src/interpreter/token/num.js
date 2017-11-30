const Token = require('./token');

class Num extends Token{
    constructor(value){
        super(value);
    }
}

Num.MATCH = function(ch){
    return /[0-9]/i.test(ch);
}

module.exports = Num;

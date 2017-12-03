const Token = require('./token');

class Sep extends Token{
    constructor(value){
        super(value);
    }

    match(tokenStream){
        var tok = tokenStream.peek();

        if(isAllSameToken(this,tok)){
            tokenStream.next();
            return tok;
        }else{
            return new Error('not match in ',this);
        }

    }
}

Sep.MATCH = /^({{|}}|\(|\)|,)/;

function isAllSameToken(tok1,tok2){
    if((tok1.__proto__ === tok2.__proto__)
        && (tok1.value === tok2.value))
        return true;
    else
        return false;
}

module.exports = Sep;

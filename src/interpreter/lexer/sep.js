const Token = require('./token');

class Sep extends Token{
    constructor(value){
        super(value);
    }

    match(tokenStream){
        var tok = tokenStream.peek();

        if(isValueEqual(this,tok) && isInheritedSep(tok)){
            tokenStream.next();
            return tok;
        }else{
            return new Error('not match in ',this);
        }

    }
}

Sep.MATCH = /^({{|}}|\(|\)|,)/;

function isValueEqual(tok1,tok2){
    return tok1.value === tok2.value;
}

function isInheritedSep(tok){
    var tem = tok.__proto__;

    while(tem){
        if(tem.__proto__ === Sep.prototype)
            return true;
        tem = tem.__proto__
    }

    return false;
}

module.exports = Sep;

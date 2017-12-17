class Token{
    constructor(value){
        this.value = value;
    }

    match(tokenStream){
        var tok = tokenStream.peek();

        if(isSameToken(this,tok)){
            tokenStream.next();
            return tok;
        }else{
            return new Error(`not match in ${tok.value}${tokenStream.peek(2).value}${tokenStream.peek(3).value}`);
        }

    }

    eval(){
        return this.value;
    }
}

function isSameToken(tok1,tok2){
    if(tok1.__proto__ === tok2.__proto__)
        return true;
    else
        return false;
}

module.exports = Token;

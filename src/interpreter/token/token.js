class Token{
    constructor(value){
        this.value = value;
        this.isOK = true;
        // use to judge match is ok in or
    }

    match(tokenStream){
        var tok = tokenStream.peek();

        if(isSameToken(this,tok)){
            tokenStream.next();
            return this;
        }else{
            return "bug!";
        }

    }
}
var a = 0;

function isSameToken(tok1,tok2){
    if((tok1.value == tok2.value) &&
        (tok1.__proto__ === tok2.__proto__))
        return true;
    else
        return false;
}

module.exports = Token;

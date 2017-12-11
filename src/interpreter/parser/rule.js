const Ident = require('../lexer/ident');
const Punc = require('../lexer/punc');
const Num = require('../lexer/num');
const Quo = require('../lexer/quo');
const Sep = require('../lexer/sep');

const AST = require('./ast');
const Repeat = require('./repeat');
const Maybe = require('./maybe');
const Or = require('./or');


class Rule{
    constructor(tag){
        this.tag = tag;
        this.eval;

        this.list = [];
    }

    ast(item){
        this.list.push(item);

        return this;
    }

    sep(str){
        this.list.push(new Sep(str));

        return this;
    }

    or(arg){
        this.list.push(new Or(arg));

        return this;
    }

    repeat(arg){
        this.list.push(new Repeat(arg));

        return this;
    }

    maybe(arg){
        this.list.push(new Maybe(arg));

        return this;
    }

    setEval(evaluate){
        this.eval = evaluate;

        return this;
    }

    match(tokenStream){
        var list = this.list;
        var ast = new AST(this.tag,this.eval);

        list.forEach(item => {
            var result = item.match(tokenStream);

            if(isAstOfRepeat(result))
                result.forEach(item => addChildWithoutPuncAndQuo(ast,item));
            else if(!isError(result))
                addChildWithoutPuncAndQuo(ast,result);
            else
                ast = result;
        });

        return ast;
    }

}

function addChildWithoutPuncAndQuo(ast,item){
    if(!isPunc(item) && !isQuo(item))
        ast.addChild(item);
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

function isPunc(obj){
    return obj.__proto__ === Punc.prototype;
}

function isQuo(obj){
    return obj.__proto__ === Quo.prototype;
}

function isAstOfRepeat(obj){
    return obj.__proto__ === Array.prototype;
}

module.exports = function(arg){
    return new Rule(arg);
}

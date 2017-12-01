const Ident = require('../lexer/ident');
const Sep = require('../lexer/sep');
const Num = require('../lexer/num');

class AST{
    constructor(type){
        this.type = type;
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }

    isLeaf(){
        return this.children.length === 0;
    }
}

class Or{
    constructor(branch){
        this.branch = branch;
    }

    match(tokenStream){
        var ast = new Error('not match in ',this);

        this.branch.forEach(item => {
            var rollbackPoint = tokenStream.createRollbackPoint();
            var result =  item.match(tokenStream);

            if(isError(result))
                tokenStream.rollback(rollbackPoint);
            else
                ast = result;
        });

        return ast;
    }
}

class Rule{
    constructor(tag){
        this.tag = tag;
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

    match(tokenStream){
        var list = this.list;
        var ast = new AST(this.tag);

        list.forEach(item => {
            var result = item.match(tokenStream)

            if(!isError(result))
                ast.addChild(result);
            else
                ast = result;
        });

        return ast;
    }

}

function isInstance(sup,obj){
    return obj.__proto__ === sup.prototype;
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

module.exports = function(arg){
    return new Rule(arg);
}

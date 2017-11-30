const Ident = require('./token/ident');
const Sep = require('./token/sep');
const Num = require('./token/num');

class AST{
    constructor(type){
        this.type = type;
        this.children = [];

        this.isOK = true;
    }

    addChild(child){
        if(child === "bug!"){
            this.isOK = false;
        }
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
        var ast;

        this.branch.forEach(item => {
            ast = new AST();

            var rollbackPoint = tokenStream.createRollbackPoint();
            var result =  item.match(tokenStream);

            if(!result.isOK)
                tokenStream.rollback(rollbackPoint);
            else
                ast.addChild(result);
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
            ast.addChild(item.match(tokenStream));
        });

        return ast;
    }

}

function isInstance(sup,obj){
    return obj.__proto__ === sup.prototype;
}

module.exports = function(arg){
    return new Rule(arg);
}

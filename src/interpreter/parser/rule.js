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

class Repeat{
    constructor(list){
        this.list = list;
    }

    match(tokenStream){
        var astArr = [];
        var list = this.list;

        while(1){
            var result = matchOnce();

            if(result)
                insertAtLastOfArr(astArr,result);
            else
                break;
        }

        return astArr;

        function matchOnce(){
            var rollbackPoint = tokenStream.createRollbackPoint();
            var arrOfResult = [];

            for(var i=0;i<list.length;i++){
                var result =  list[i].match(tokenStream);

                if(isError(result)){
                    tokenStream.rollback(rollbackPoint);
                    return false;
                }else{
                    arrOfResult.push(result);
                }
            }

            return arrOfResult;
        }
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

    repeat(arg){
        this.list.push(new Repeat(arg));

        return this;
    }

    match(tokenStream){
        var list = this.list;
        var ast = new AST(this.tag);

        list.forEach(item => {
            var result = item.match(tokenStream);

            if(isAstOfRepeat(result))
                result.forEach(item => ast.addChild(item));
            else if(!isError(result))
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

function isAstOfRepeat(obj){
    return obj.__proto__ === Array.prototype;
}

function insertAtLastOfArr(main,arr){
    for(var i=0;i<arr.length;i++)
        main.push(arr[i]);
}


module.exports = function(arg){
    return new Rule(arg);
}

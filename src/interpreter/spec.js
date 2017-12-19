const ENV = require('./env');

const rule = require('./parser/rule');
const tokenStream = require('./lexer/tokenStream');

const Ident = require('./lexer/ident');
const Punc = require('./lexer/punc');
const Num = require('./lexer/num');
const Sep = require('./lexer/sep');
const Html = require('./lexer/html');

var ident = new Ident();
var num = new Num();
var html = new Html();

var dot = rule('dot').ast(ident).repeat([sep('.'),ident]).setEval(
    function (){
        if(this.getNumberOfChild() === 1)
            return this.getChild(0).eval();
        else
            return  ENV.scope.getChild(
                this.getChild(0).value,
                this.getChild(1).value);
    }
);

var str = rule('str').sep('`').ast(html).sep('`').setEval(
    function(){
        return this.getFirstChild().eval();
    }
);
var arg = rule('arg').or([str,dot,num]).setEval(
    function (){
        return this.getFirstChild().eval();
    }
);

var call = rule('call').ast(ident).sep('(').ast(arg).repeat([sep(','),arg]).sep(')').setEval(
    function (){
        var func = this.getFirstChild().eval();
        var args = [];

        for(var i=1;i<this.getNumberOfChild();i++){
            var item = this.getChild(i).eval();
            args.push(this.getChild(i).eval());
        }

        return ENV.call(func,args);
    }
);

// stmt : (html) '{{' call '}}' (html)
var stmt = rule('stmt').maybe([html]).sep('{{').or([call,dot]).sep('}}').maybe([html]).setEval(
    async function (){
        var str = '';

        for(var i=0;i<this.getChildren().length;i++){
            str += await this.getChildren()[i].eval();
        }

        return str;
    }
);


function sep(value){
    return new Sep(value);
}

module.exports = async function (code,callback){
    var ts = new tokenStream(code);

    if(isError(ts)){
        callback(ts);
        return;
    }

    var ast =  stmt.match(ts);

    if(isError(ast)){
        callback(ast);
        return;
    }

    callback(null,await ast.eval());
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

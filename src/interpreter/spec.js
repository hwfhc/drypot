const ENV = require('./env/index');

const rule = require('./parser/rule');
const tokenStream = require('./lexer/tokenStream');

const Ident = require('./lexer/ident');
const Punc = require('./lexer/punc');
const Num = require('./lexer/num');
const Html = require('./lexer/html');

var ident = new Ident();
var num = new Num();
var html = new Html();

var str = rule('str').quo('`').ast(html).quo('`')
var arg = rule('arg').or([str,ident,num]).setEval(
    function (){
        return this.getFirstChild().eval();
    });

var call = rule('call')
    .ast(ident).punc('(').ast(arg).repeat([punc(','),arg]).punc(')')
    .setEval(function (){
        var func = this.getFirstChild().eval();
        var args = [];

        for(var i=1;i<this.getNumberOfChild();i++){
            var item = this.getChild(i).eval();
            args.push(this.getChild(i).eval());
        }

        return ENV.call(func,args);
    });

var stmt = rule('stmt').maybe([ident]).punc('{{').ast(call).punc('}}').setEval(
    function (){
        return this.getFirstChild().eval();
    });


function punc(value){
    return new Punc(value);
}

module.exports = function (code){
    var token = new tokenStream(code);
    console.log(token.stream);

    var ast =  stmt.match(token);
    console.log(ast.children[2]);
    console.log(ast.children[1].children[1].children[0]);
    console.log(ast.children[1].children[2]);
    console.log(ast.children[1].children[3]);
    console.log(ast.children[1].children[4]);

    return ast.eval();
}

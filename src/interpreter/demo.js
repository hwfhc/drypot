const rule = require('./rule');
const tokenStream = require('./tokenStream');
const Ident = require('./token/ident');
const Sep = require('./token/sep');

var ident = new Ident('value');
var num = new Ident('num');
var arg = rule('arg').or([ident,num]);

var expr = rule('expr').ast(ident).sep('(').ast(arg).sep(')');
var stmt = rule('stmt').sep('{{').ast(expr).sep('}}');

var token = new tokenStream([
    new Sep('{{'),new Ident('value'),new Sep('('),new Ident('num'),new Sep(')'),new Sep('}}')
]);



var ast = stmt.match(token);


// a bug here arg between token have duplicate AST node!!!!!!!!!!!!!!!!1
console.log(ast);
console.log("");
console.log(ast.children[0]);
console.log("");
console.log(ast.children[1]);
console.log("");
console.log(ast.children[1].children[2]);
console.log("");
console.log(ast.children[1].children[2].children[0]);
console.log("");
console.log(ast.children[2]);
console.log("");

const rule = require('./parser/rule');
const tokenStream = require('./lexer/tokenStream');

const Ident = require('./lexer/ident');
const Sep = require('./lexer/sep');
const Num = require('./lexer/num');

var ident = new Ident();
var num = new Num();
var comma = new Sep(',');
var arg = rule('arg').or([ident,num]);

var call = rule('call').ast(ident).sep('(').ast(arg).repeat([comma,arg]).sep(')');
var stmt = rule('stmt').sep('{{').ast(call).sep('}}');

var token = new tokenStream('{{call(value,12,1)}}');


//console.log(token.stream);
var ast = stmt.match(token);


console.log(ast);
console.log("");
console.log(ast.children[0]);
console.log("");
console.log(ast.children[1]);
console.log("");
console.log(ast.children[1].children[2]);
console.log("");
console.log(ast.children[1].children[2].children[0]);
console.log(ast.children[1].children[4].children[0]);
console.log(ast.children[1].children[6].children[0]);
console.log("");
console.log(ast.children[2]);
console.log("");


const rule = require('./parser/rule');
const tokenStream = require('./lexer/tokenStream');

const Ident = require('./lexer/ident');
const Punc = require('./lexer/punc');
const Num = require('./lexer/num');

var ident = new Ident();
var num = new Num();
var arg = rule('arg').or([ident,num]);

var call = rule('call').ast(ident).punc('(').ast(arg).repeat([punc(','),arg]).punc(')');
var stmt = rule('stmt').punc('{{').ast(call).punc('}}');


function punc(value){
    return new Punc(value);
}

module.exports = function (code){
    var token = new tokenStream(code);

    return stmt.match(token);
}

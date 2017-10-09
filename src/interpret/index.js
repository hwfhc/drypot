const inputStream = require('./inputStream');
const tokenStream = require('./tokenStream');
const parse = require('./parse');
const interpret = require('./interpret_html');

module.exports = function(text,callback){
    var tree = parse(tokenStream(inputStream(text)));

    interpret(tree,callback);
};

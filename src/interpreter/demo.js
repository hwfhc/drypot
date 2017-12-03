const exec = require('./spec')

var ast = exec('{{call(value,1564,4156,ident)}}');

console.log(ast);
console.log("");
console.log(ast.children[0]);
console.log("");
console.log(ast.children[0].children[0]);
console.log(ast.children[0].children[1]);
console.log(ast.children[0].children[2]);
console.log(ast.children[0].children[3]);
console.log("");

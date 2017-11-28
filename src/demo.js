var rule = require('./rule.js');

var ident = rule().ast('ident');
var arg = rule().ast(ident);

var expr = rule().ast('(').ast(arg).ast(')');
var stmt = rule().ast('{{').ast(ident).ast(expr).ast('}}');

var token = {
    value: [
        '{{','ident','(','ident',')','}}'
    ],
    index: -1,
    next(){
      this.index++;
      return this.value[this.index];
    },
    peek(){
      return this.value[this.index+1];
    }
}


console.log(stmt.match(token));


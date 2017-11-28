var rule = require('./rule.js');

var ident = rule().ast('ident');
var num = rule().ast('num');
var arg = rule().or([ident,num]);

var expr = rule().ast(ident).ast('(').ast(arg).ast(')');
var stmt = rule().ast('{{').ast(expr).ast('}}');

var token = {
    value: [
        '{{','ident','(','num',')','}}'
    ],
    index: -1,
    next(){
      this.index++;
      return this.value[this.index];
    },
    peek(){
      return this.value[this.index+1];
    },
    createRollbackPoint(){
        return {
            index: this.index
        }
    },
    rollback(point){
        this.index = point.index;
    }
}

var token2 = {
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
    },
    createRollbackPoint(){
        return {
            index: this.index
        }
    },
    rollback(point){
        this.index = point.index;
    }
}


console.log(stmt.match(token));
console.log(stmt.match(token2));

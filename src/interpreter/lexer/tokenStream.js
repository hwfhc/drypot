const Num = require('./num');
const Ident = require('./ident');
const Punc = require('./punc');
const Html = require('./html');

const tokenList_outStr = [Num,Ident,Punc];
const tokenList_inStr = [Html,Punc];

var tokenList = tokenList_outStr;

class TokenStream{
    constructor(code){
        this.index = -1;
        this.stream = scan(code);

        this.inStr = false;
    }

    next(){
      this.index++;
      return this.stream[this.index];
    }

    peek(){
      return this.stream[this.index+1];
    }

    createRollbackPoint(){
        return {
            index: this.index
        }
    }

    rollback(point){
        this.index = point.index;
    }
}

function scan(str){
    var stream = [];

    while(str.length > 0)
        stream.push(getOneToken());

    return stream;

    function getOneToken(){
        for(var i=0;i<tokenList.length;i++){
            var item = tokenList[i];
            var result = str.match(item.MATCH);


            if(result){
                if(isStrStart(result[0])){
                    this.inStr = !this.inStr;

                    if(this.inStr)
                        tokenList = tokenList_inStr;
                    else
                        tokenList = tokenList_outStr;
                }

                str = str.substr(result[0].length);
                return new item(result[0]);
            }

        }
    }
}

function isStrStart(char){
    var a = (char === '`');
    return a ;
}

module.exports = TokenStream;

const Num = require('./num');
const Ident = require('./ident');
const Sep = require('./sep');

const tokenList = [Num,Ident,Sep];

class TokenStream{
    constructor(code){
        this.index = -1;
        this.stream = scan(code);
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
                str = str.substr(result[0].length);
                return new item(result[0]);
            }

        }
    }
}

module.exports = TokenStream;

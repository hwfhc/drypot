const Mode = require('./mode');

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
    var mode = new Mode();

    while(str.length > 0){
        var result = getOneToken();

        if(!result){
            console.error("Unexpected token");
            break;
        }

        stream.push(result);
    }

    return stream;

    function getOneToken(){
        for(var i=0;i<mode.getMode().length;i++){
            var item = mode.getMode()[i];
            var result = str.match(item.MATCH);

            if(!result)
                continue;

            mode.switch(result[0]);

            str = str.substr(result[0].length);
            return new item(result[0]);
        }
    }

}


module.exports = TokenStream;

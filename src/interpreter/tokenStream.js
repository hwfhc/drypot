class TokenStream{
    constructor(code){
        this.index = -1;
        this.stream = code;
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

module.exports = TokenStream;

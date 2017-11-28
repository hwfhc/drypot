class Rule{
    constructor(rule){
        this.list = [];
    }

    ast(item){
        this.list.push(item);

        return this;
    }

    or(arg){
        var or = [];

        arg.forEach(item => {
            or.push(item);
        });

        this.list.push(or);

        return this;
    }

    match(tokenStream){
        var list = this.list;

        return this.list.every(item => {
            var tok = tokenStream.peek();

            //is token
            if(typeof item === 'string'){
                var result = item === tok;
                tokenStream.next();
                return result;
            }

            //is or
            if(item.__proto__ === Array.prototype){
                var result = item.some(or => {
                    var rollbackPoint = tokenStream.createRollbackPoint();
                    var orResult =  or.match(tokenStream);

                    if(!orResult)
                        tokenStream.rollback(rollbackPoint);

                    return orResult;
                });

                return result;
            }

            //is rule
            if(item.__proto__ === Rule.prototype){
                var result = item.match(tokenStream);
                return result;
            }
        });


    }

}

module.exports = function(arg){
    return new Rule(arg);
};

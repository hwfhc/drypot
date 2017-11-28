class Rule{
    constructor(rule){
        this.list = [];
    }

    ast(item){
        this.list.push(item);

        return this;
    }

    or(arg){
        this.list.push(item);
        var or = [];

        arg.forEach(item => {
            or.push(item);
        });

        return this;
    }

    match(tokenStream){
        var list = this.list;

        return this.list.every(item => {
            var tok = tokenStream.peek();

            if(typeof item === 'string'){
                var result = item === tok;
                tokenStream.next();
                return result;
            }

            /*if(item.__proto__ === Array.prototype){
                var result = item.some(or => {
                    return or.match(tokenStream);
                });
                return result;
            }*/

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

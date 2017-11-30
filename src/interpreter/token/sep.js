const Token = require('./token');

class Sep extends Token{
    constructor(value){
        super(value);
    }
}

Sep.MATCH = function(ch){
    return ",;(){}.".indexOf(ch) >= 0;
}

module.exports = Sep;

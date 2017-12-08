const Token = require('./token');

class Html extends Token{
    constructor(value){
        super(value);
    }
}

Html.MATCH = /^[a-zA-Z_0-9]+/;

module.exports = Html;

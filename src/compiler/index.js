const interpreter = require('./interpreter');

module.exports = function(text,callback){
    interpreter(text,callback);
};

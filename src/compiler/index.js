const interpreter = require('./lib/interpreter');

module.exports = function(text,callback){
    interpreter(text,callback);
};

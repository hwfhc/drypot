const interpreter = require('./lib/interpreter');

module.exports.interpretDynamicHtml = function(text,callback){
    interpreter.interpretDynamicHtml(text,callback);
};

module.exports.add = interpreter.add;

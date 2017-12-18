module.exports = call;

function call(func,arg,callback){
    return func.call(this,arg);
}

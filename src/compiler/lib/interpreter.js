module.exports = interpretDynamicHtml;

const parser = require('./parser');
const call = require('./call');
const scope = require('./scope');


function interpretDynamicHtml(code,callback){
    var input = parser(code);

    var html = '';
    var arr = input.html;
    var promiseArr = [];

    var kw = 'item';

    for(let i=0;i<arr.length;i++){
        var promise = new Promise(function(resolve, reject) {
            interpret(arr[i],function(result){
                arr[i] = result;
                resolve();
            });
        });
        promiseArr.push(promise);
    }

    Promise.all(promiseArr).then(function(){
        for(var i=0;i<arr.length;i++){
            html += arr[i];
        }

        callback(html);
    });


    function interpret(input,callback){
        if(input.value === 'item' && input.type === 'var')
        {
            callback(scope.getItem());
            return;
        }
        if(is_text(input)) callback(input.value);
        if(is_num(input)) callback(interpret_num(input));
        if(is_call(input)) interpret_call(input,callback);
        if(is_var(input)) callback(interpret_var(input));
        if(is_dot(input)) callback(interpret_dot(input));
        if(is_str(input)) interpret_str(input,callback);
    }

    function interpret_call(input,callback){
        var arg = [];
        var promiseArr = [];

        for(let i=0;i<input.arguments.length;i++){
            arg[i] = input.arguments[i];
            var promise = new Promise(function(resolve, reject) {
                interpret(arg[i],function(result){ arg[i] = result; resolve();
                });
            });
            promiseArr.push(promise);
        }

        Promise.all(promiseArr).then(function(){
            call(input.func,arg,callback);
        });
    }
    function interpret_str(input,callback){
        if(!input.parts) callback(input.value);

        var text = '';
        var arr = input.parts;
        var promiseArr = [];

        for(let i=0;i<arr.length;i++){
            var promise = new Promise(function(resolve, reject) {
                interpret(arr[i],function(result){
                    arr[i] = result;
                    resolve();
                });
            });
            promiseArr.push(promise);
        }

        Promise.all(promiseArr).then(function(){
            for(var i=0;i<arr.length;i++){
                text += arr[i];
            }
            callback(text);
        });
    }
    function interpret_var(input){
        return scope.get(input.value);
    }
    function interpret_dot(input){
        if(input.value === 'item') return scope.getItemChild(input.arrow.value);
        return scope.getChild(input.value,input.arrow.value);
    }
    function interpret_num(input){
        return input.value;
    }

    function is_text(input){
        return input.type === 'text';
    }
    function is_num(input){
        return input.type === 'num';
    }
    function is_call(input){
        return input.type === 'call';
    }
    function is_var(input){
        return input.type === 'var'&&
            input.value != 'item';
    }
    function is_dot(input){
        return input.type === 'dot';
    }
    function is_str(input){
        return input.type === 'str';
    }

}



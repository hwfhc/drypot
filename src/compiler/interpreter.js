module.exports = interpretDynamicHtml;

const parser = require('./parser');

const call = (function call(){
    function call(func,arg,callback){
        arg.push(callback);
        funcPool[func].apply(window,arg);
    }

    var funcPool = {};
    funcPool.getPathname = function(number,callback){
        callback(window.location.pathname.split('/')[number]);
    }
    funcPool.ajax = function (url,callback){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                callback(xmlhttp.responseText);
            }
        }

        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    }

    return call;
})();


function interpretDynamicHtml(code,callback){
    var input = parser(code);

    var html = '';
    var arr = input.html;
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
            html += arr[i];
        }

        callback(html);
    });


    function interpret(input,callback){
        if(is_text(input)) callback(input.value);
        if(is_num(input)) callback(interpret_num(input));
        if(is_call(input)) interpret_call(input,callback);
        if(is_str(input)) interpret_str(input,callback);
    }

    function interpret_call(input,callback){
        var arg = [];
        var promiseArr = [];

        for(let i=0;i<input.arguments.length;i++){
            arg[i] = input.arguments[i];
            var promise = new Promise(function(resolve, reject) {
                interpret(arg[i],function(result){
                    arg[i] = result;
                    resolve();
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
    function is_str(input){
        return input.type === 'str';
    }

}



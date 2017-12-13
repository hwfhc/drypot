const fs = require('fs');

const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName,'utf8', function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

module.exports = {
    call
};

const funcPool = {};

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

funcPool.read = async function (arg){
    var str = await readFile('./test');


    return str;
}

function call(func,arg,callback){
    //arg.push(callback);
    return funcPool[func].call(this,arg);
}



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

funcPool.test = function (arg){
    var str = '';

    for(var i=0;i<arg.length;i++){
        str += arg[i];
    }

    return str;
}


function call(func,arg,callback){
    //arg.push(callback);
    return funcPool[func].call(this,arg);
}



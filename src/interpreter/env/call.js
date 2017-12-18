module.exports = call;

const funcPool = {};

funcPool.getPathname = function(number,callback){
    callback(window.location.pathname.split('/')[number]);
}


funcPool.ajax = async function (url){
    return await sendReq(url);
}

funcPool.test = function (url){
    return url;
}


function sendReq(url){
    return new Promise((resolve,reject) => {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                resolve(xmlhttp.responseText);
            }
        }

        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    });
}


function call(func,arg,callback){
    //arg.push(callback);
    return funcPool[func].call(this,arg);
}

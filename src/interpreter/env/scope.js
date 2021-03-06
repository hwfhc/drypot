"use strict";
module.exports = {
    set,
    get,
    setItem,
    getItem,
    getTem,

    getItemChild
};

const scope = {
    bool: {
        a : 1
    },
    tem: [],
    item: {},
    ajax: async function (url){
        return await sendReq(url);
    },
    getPathname: function(number,callback){
        callback(window.location.pathname.split('/')[number]);
    }
}

function set(ident = undefined,value){
    scope[ident] = value;
}

function get(ident) {
    if (isArray(ident)) {
        var tem = scope[ident[0]];

        if (!tem) return formErr();

        for (var i = 1; i < ident.length; i++) {
            var tem = tem[ident[i]];

            if (!tem) return formErr();
        }

    }
    else {
        var tem = scope[ident];

        if (!tem) return formErr();
    }

    return tem;

    function formErr() {
        if (isArray(ident)) {
            var str = ident[0];

            for (var j = i; j < i; j++)
                str += `.${ident[j]}`;

            return new Error(`variable is undefiend : ${str}`);
        }
        else
            return new Error(`variable is undefiend : ${ident}`);
    }
}


function getTem() {
    return scope.tem;
}

function getItem(ident){
    return scope.item;
}

function getItemChild(child){
    return scope.item[child];
}

function setItem(){
    scope.item = scope['tem'].splice(0,1)[0];
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

function isArray(obj){
    return obj.__proto__ === Array.prototype;
}
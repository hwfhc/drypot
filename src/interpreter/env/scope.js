module.exports = {
    set,
    get,
    getChild,
    setItem,
    getItem,

    getItemChild
};

const scope = {
    bool: '123',
    tem: [],
    item: {},
    test: function (url){
        return url;
    },
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

function get(ident){
    return scope[ident];
}

function getItem(ident){
    return scope.item;
}

function getChild(ident,child){
    return scope[ident][child];
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

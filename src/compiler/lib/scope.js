module.exports = {
    set,
    get,
    getChild,
    setItem,
    getItem,

    getItemChild
};

const scope = {
    ajax: 'asdfadsf',
    demo: { test:123 },
    bool: false,//here is a bug, the result of {{bool}} is 'false',a string.
    tem: [],
    item: {}
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

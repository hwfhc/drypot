module.exports = { set,get,getChild,getItem };

const scope = {
    ajax : 'asdfadsf',
    demo : { test:123 }
}

function set(ident = undefined,value){
    scope[ident] = value;
}

function get(ident){
    return scope[ident];
}

function getItem(ident){
    var data = scope[ident].splice(0,1);
    return data[0];
}

function getChild(ident,child){
    return scope[ident][child];
}

module.exports = { set,get,getChild };

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

function getChild(ident,child){
    return scope[ident][child];
}

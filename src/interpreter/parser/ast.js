class AST{
    constructor(type){
        this.type = type;
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }
}

module.exports = AST;

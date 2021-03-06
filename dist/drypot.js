/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Token{
    constructor(value){
        this.value = value;
    }

    match(tokenStream){
        var tok = tokenStream.peek();
        if(!tok)
            return new Error(`no tok rest`);

        if(isSameToken(this,tok)){
            tokenStream.next();
            return tok;
        }else{
            var errMessage = tok.value;

            if(tokenStream.peek(2))
                errMessage += tokenStream.peek(2).value;
            if(tokenStream.peek(3))
                errMessage += tokenStream.peek(3).value;

            return new Error(`not match in ${errMessage}`);
        }

    }

    eval(){
        return this.value;
    }
}

function isSameToken(tok1,tok2){
    if(tok1.__proto__ === tok2.__proto__)
        return true;
    else
        return false;
}

module.exports = Token;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Sep = __webpack_require__(2);

class Punc extends Sep{
    constructor(value){
        super(value);
    }
}

Punc.MATCH = /^(\(|\)|,|\.)/;

module.exports = Punc;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Token = __webpack_require__(0);

class Sep extends Token{
    constructor(value){
        super(value);
    }

    match(tokenStream){
        var tok = tokenStream.peek();

        if(isValueEqual(this,tok) && isInheritedSep(tok)){
            tokenStream.next();
            return tok;
        }else{
            var errMessage = tok.value;

            if(tokenStream.peek(2))
                errMessage += tokenStream.peek(2).value;
            if(tokenStream.peek(3))
                errMessage += tokenStream.peek(3).value;

            return new Error(`not match in ${errMessage}`);
        }

    }
}

function isValueEqual(tok1,tok2){
    return tok1.value === tok2.value;
}

function isInheritedSep(tok){
    var tem = tok.__proto__;

    while(tem){
        if(tem.__proto__ === Sep.prototype)
            return true;
        tem = tem.__proto__
    }

    return false;
}

module.exports = Sep;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const call = __webpack_require__(9);
const scope = __webpack_require__(10);

module.exports = {
    call,scope
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Token = __webpack_require__(0);
const ENV = __webpack_require__(3);

class Ident extends Token{
    constructor(value){
        super(value);
    }

    eval(){
        return ENV.scope.get(this.value);
    }
}

Ident.MATCH = /^[a-zA-Z_]+/;

module.exports = Ident;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Token = __webpack_require__(0);

class Num extends Token{
    constructor(value){
        super(value);
    }
}

Num.MATCH = /^[0-9]+/;

module.exports = Num;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Punc = __webpack_require__(1);

class Quo extends Punc{
    constructor(){
        super('`');
    }
}

Quo.MATCH = /^(`)/;

module.exports = Quo;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Token = __webpack_require__(0);

class Html extends Token{
    constructor(value){
        super(value);
    }
}

Html.MATCH = /^[^(`|{{|}})]+/;

module.exports = Html;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function (){
    const ENV  = __webpack_require__(3);
    const scope  = ENV.scope;
    const compiler = __webpack_require__(11);

    const dp_component = document.getElementsByClassName('dp-component');
    const dp_dynamic = document.getElementsByClassName('dp-dynamic');
    const dp_for = document.getElementsByClassName('dp-for');
    const dp_if = document.getElementsByClassName('dp-if');

    (function initComponent(){
        var elements = dp_component;

        for(var i=0;i<elements.length;i++){
            let name = dp_component[i].tagName.toLowerCase();

            getDataWithAJAX('GET',`/components/${name}`,dp_component[i],function(data,component){
                data += `<link href="/components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var elements = dp_dynamic;

        for(let i=0;i<elements.length;i++){
            let node = elements[i];
            let html = elements[i].innerHTML;
            let name = elements[i].getAttribute('dp-name');
            let data = elements[i].getAttribute('dp-data');

            if(data){
                new Promise((resolve,reject) => {
                    compiler(data,(err,result) => {
                        scope.set(name,JSON.parse(result));
                        resolve(result);
                    })

                }).then(result =>
                    compiler(html,result =>{
                        removeTag(node);
                        node.innerHTML = result;
                    })
                );
            }else{
                compiler(html,(err,result) => {
                    removeTag(node);
                    node.innerHTML = result;
                });
            }
        }
    })();

    (function initFor(){
        var elements = dp_for;

        for(let i=0;i<elements.length;i++){
            let parent = elements[i].parentNode;
            let last = elements[i].nextSibling;
            let node = elements[i];
            let html = node.innerHTML;
            let data = node.getAttribute('dp-data');

            parent.removeChild(node);
            i--;

            new Promise((resolve,reject) => {
                compiler(data,(err,result) => {
                    scope.set('tem',JSON.parse(result));
                    removeTag(node);

                    resolve(result);
                });

            }).then(result => {

                var length = JSON.parse(result).length;

                for(let j=0;j<length;j++){
                    scope.setItem();
                    compiler(html,(err,result) => {
                        let child = node.cloneNode(true);
                        child.innerHTML = result;

                        parent.insertBefore(child,last);
                    });
                }
            });
        }
    })();

    (function initIf(){
        var elements = dp_if;

        for(let i=0;i<elements.length;i++){
            let node = elements[i];
            let bool = node.getAttribute('dp-var');

            compiler(bool,(err,result) => {
                if(result === 'false')
                    node.parentNode.removeChild(node);
            });
        }
    })();

    function removeTag(item){
        item.removeAttribute('dp-name');
        item.removeAttribute('dp-data');
        item.removeAttribute('dp-var');
    }

    function getDataWithAJAX(method,url,element,callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText,element);
            }
        };
        xhttp.open(method,url, true);
        xhttp.send();
    }
})();


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = call;

function call(func,arg,callback){
    return func.call(this,arg);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
    set,
    get,
    getChild,
    setItem,
    getItem,
    getTem,

    getItemChild
};

const scope = {
    bool: '123',
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

function get(ident){
    return scope[ident];
}


function getTem(){
    return scope.tem;
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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const ENV = __webpack_require__(3);

const rule = __webpack_require__(12);
const tokenStream = __webpack_require__(17);

const Ident = __webpack_require__(4);
const Punc = __webpack_require__(1);
const Num = __webpack_require__(5);
const Sep = __webpack_require__(2);
const Html = __webpack_require__(7);

var ident = new Ident();
var num = new Num();
var html = new Html();

var dot = rule('dot').ast(ident).repeat([sep('.'),ident]).setEval(
    function (){
        if(this.getNumberOfChild() === 1)
            return this.getChild(0).eval();
        else
            return  ENV.scope.getChild(
                this.getChild(0).value,
                this.getChild(1).value);
    }
);

var str = rule('str').sep('`').ast(html).sep('`').setEval(
    function(){
        return this.getFirstChild().eval();
    }
);
var arg = rule('arg').or([str,dot,num]).setEval(
    function (){
        return this.getFirstChild().eval();
    }
);

var call = rule('call').ast(ident).sep('(').ast(arg).repeat([sep(','),arg]).sep(')').setEval(
    function (){
        var func = this.getFirstChild().eval();
        var args = [];

        for(var i=1;i<this.getNumberOfChild();i++){
            var item = this.getChild(i).eval();
            args.push(this.getChild(i).eval());
        }

        return ENV.call(func,args);
    }
);

// stmt : (html) '{{' call '}}' (html)
var stmt = rule('stmt').maybe([html]).sep('{{').or([call,dot]).sep('}}').maybe([html]).setEval(
    async function (){
        var str = '';

        for(var i=0;i<this.getChildren().length;i++){
            str += await this.getChildren()[i].eval();
        }

        return str;
    }
);


function sep(value){
    return new Sep(value);
}

module.exports = async function (code,callback){
    var ts = new tokenStream(code);

    if(isError(ts)){
        callback(ts);
        return;
    }

    var ast =  stmt.match(ts);

    if(isError(ast)){
        callback(ast);
        return;
    }

    callback(null,await ast.eval());
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Ident = __webpack_require__(4);
const Punc = __webpack_require__(1);
const Num = __webpack_require__(5);
const Quo = __webpack_require__(6);
const Sep = __webpack_require__(2);

const AST = __webpack_require__(13);
const Repeat = __webpack_require__(14);
const Maybe = __webpack_require__(15);
const Or = __webpack_require__(16);


class Rule{
    constructor(tag){
        this.tag = tag;
        this.eval;

        this.list = [];
    }

    ast(item){
        this.list.push(item);

        return this;
    }

    sep(str){
        this.list.push(new Sep(str));

        return this;
    }

    or(arg){
        this.list.push(new Or(arg));

        return this;
    }

    repeat(arg){
        this.list.push(new Repeat(arg));

        return this;
    }

    maybe(arg){
        this.list.push(new Maybe(arg));

        return this;
    }

    setEval(evaluate){
        this.eval = evaluate;

        return this;
    }

    match(tokenStream){
        var list = this.list;
        var ast = new AST(this.tag,this.eval);

        for(var i=0;i<list.length;i++){
            var item = list[i];

            var result = item.match(tokenStream);

            if(isAstOfRepeat(result))
                result.forEach(item => addChildWithoutSep(ast,item));
            else if(!isError(result))
                addChildWithoutSep(ast,result);
            else
                return result;
        }


        return ast;
    }

}

function addChildWithoutSep(ast,item){
    if(!isSep(item))
        ast.addChild(item);
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

function isSep(tok){
    var tem = tok.__proto__;

    while(tem){
        if(tem.__proto__ === Sep.prototype)
            return true;
        tem = tem.__proto__
    }

    return false;
}

function isAstOfRepeat(obj){
    return obj.__proto__ === Array.prototype;
}

module.exports = function(arg){
    return new Rule(arg);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

class AST{
    constructor(type,evaluate){
        this.type = type;
        this.eval = evaluate;

        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }

    getChild(index){
        return this.children[index];
    }

    getChildren(){
        return this.children
    }

    getFirstChild(){
        return this.children[0];
    }

    getNumberOfChild(){
        return this.children.length;
    }
}

module.exports = AST;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

class Repeat{
    /*
     * repeat 0 time or more time
     *
     */
    constructor(list){
        this.list = list;
    }

    match(tokenStream){
        var astArr = [];

        while(1){
            var result = matchOnce(this.list,tokenStream);

            if(result)
                insertAtLastOfArr(astArr,result);
            else
                break;
        }

        return astArr;
    }
}

function matchOnce(list,tokenStream){
    var rollbackPoint = tokenStream.createRollbackPoint();
    var arrOfResult = [];

    for(var i=0;i<list.length;i++){
        var result =  list[i].match(tokenStream);

        if(isError(result)){
            tokenStream.rollback(rollbackPoint);
            return false;
        }else{
            arrOfResult.push(result);
        }
    }

    return arrOfResult;
}


function insertAtLastOfArr(main,arr){
    for(var i=0;i<arr.length;i++)
        main.push(arr[i]);
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

module.exports = Repeat;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

class Maybe{
    constructor(list){
        this.list = list;
    }

    match(tokenStream){
        var astArr = [];

        var result = matchOnce(this.list,tokenStream);

        if(result)
            insertAtLastOfArr(astArr,result);

        return astArr;
    }
}

function matchOnce(list,tokenStream){
    var rollbackPoint = tokenStream.createRollbackPoint();
    var arrOfResult = [];

    for(var i=0;i<list.length;i++){
        var result =  list[i].match(tokenStream);

        if(isError(result)){
            tokenStream.rollback(rollbackPoint);
            return false;
        }else{
            arrOfResult.push(result);
        }
    }

    return arrOfResult;
}


function insertAtLastOfArr(main,arr){
    for(var i=0;i<arr.length;i++)
        main.push(arr[i]);
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

module.exports = Maybe;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

class Or{
    constructor(branch){
        /*
         * the first branch has the biggest priority
         */
        this.branch = branch;
    }

    match(tokenStream){
        var ast = new Error('not match in ',this);

        this.branch.forEach(item => {
            var rollbackPoint = tokenStream.createRollbackPoint();
            var result =  item.match(tokenStream);

            if(isError(result))
                tokenStream.rollback(rollbackPoint);
            else
                ast = result;
        });

        return ast;
    }
}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}

module.exports = Or;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const Mode = __webpack_require__(18);

class TokenStream{
    constructor(code){
        this.index = -1;
        this.stream = scan(code);

        if(isError(this.stream))
            return this.stream;
    }

    next(){
        this.index++;
        return this.stream[this.index];
    }

    peek(i=1){
      return this.stream[this.index+i];
    }

    createRollbackPoint(){
        return {
            index: this.index
        }
    }

    rollback(point){
        this.index = point.index;
    }
}

function scan(str){
    var stream = [];
    var mode = new Mode();

    while(str.length > 0){
        var result = getOneToken();

        if(!result){
            return new Error(`Unexpected token \'${str}\'`);
        }

        stream.push(result);
    }

    return stream;

    function getOneToken(){
        for(var i=0;i<mode.getMode().length;i++){
            var item = mode.getMode()[i];
            var result = str.match(item.MATCH);

            if(!result)
                continue;

            mode.switch(result[0]);

            str = str.substr(result[0].length);
            return new item(result[0]);
        }
    }

}

function isError(obj){
    return obj.__proto__ === Error.prototype;
}


module.exports = TokenStream;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const Token = __webpack_require__(0);

const Num = __webpack_require__(5);
const Ident = __webpack_require__(4);
const Punc = __webpack_require__(1);
const Html = __webpack_require__(7);
const Quo = __webpack_require__(6);
const Code = __webpack_require__(19);

const outCode = [Html,Code];
const inStr = [Html,Quo];
const outStr = [Num,Ident,Quo,Punc,Code];


class Mode{
    constructor(){
        this.list = outCode;
    }

    getMode(){
        return this.list;
    }

    switch(char){
        if(char === '{{')
            this.list = outStr;


        if(char === '}}')
            this.list = outCode;

        if(char === '`'){
            if(this.list === inStr)
                this.list = outStr;
            else
                this.list = inStr;
        }
    }
}


function isStrStart(char){
    var a = (char === '`');
    return a ;
}

module.exports = Mode;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const Sep = __webpack_require__(2);

class Code extends Sep{
    constructor(value){
        super(value);
    }
}

Code.MATCH = /^({{|}})/;

module.exports = Code;


/***/ })
/******/ ]);
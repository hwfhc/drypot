(function core(){
    const components = document.getElementsByClassName('dp-component');
    const dynamic = document.getElementsByClassName('dp-dynamic');

    (function initComponents(){
        for(var i=0;i<components.length;i++){
            let name = components[i].tagName.toLowerCase();

            // I can add a module to manage ajax request, and there is just one ajax request to the same resources at the same time
            getDataWithAJAX('GET',`/components/${name}`,components[i],function(data,component){
                data += `<link href="/components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var reg = /\{\{[^\)]+\}\}/g;
        var element = dynamic;

        for(let i=0;i<element.length;i++){
            let innerHTML = element[i].innerHTML;

            var parse = parseDynamicHtml(tokenStream(inputStream(innerHTML)));
            interpretDynamicHtml(parse,function(result){
                element[i].innerHTML = result;
            });
        }
    })();

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

    var call = (function call(){
        function call(func,arg,callback){
            arg.push(callback);
            funcPool[func].apply(window,arg);
        }

        var funcPool = {};
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

        return call;
    })();

    function inputStream(input) {
        var pos = 0, line = 1, col = 0;

        return {next,peek,before,eof,croak};

        /**
         * Get next char in input stream and remove it from stream.
         *
         * @return {char}
         * @public
         */

        function next() {
            var ch = input.charAt(pos);pos++;
            if (ch == "\n") line++, col = 0; else col++;
            return ch;
        }

        /**
         * Get char with offset num without removing.
         * eg: n = 1 will get next char.
         *
         * @param {number} num
         * @return {char}
         * @public
         */

        function peek(num = 1) {
            var offset = num - 1;
            return input.charAt(pos + offset);
        }

        /**
         * Get the char before the char of next().
         *
         * @return {char}
         * @public
         */

        function before() {
            return input.charAt(pos - 1);
        }

        /**
         * If there is no char in input stream.
         *
         * @public
         * @return {boolean}
         */

        function eof() {
            return peek() == "";
        }

        /**
         * Throw a error.
         *
         * @param {string} msg
         * @public
         */

        function croak(msg) {
            throw new Error(msg + " (" + line + ":" + col + ")");
        }

    }

    function tokenStream(input) {
        var current = null;
        //var keywords = " if then else lambda λ true false ";
        var read_next = read_next_out_code;

        return {next,peek,eof,croak : input.croak};

        function read_next_out_code(){
            if (input.eof()) return null;
            var ch = input.peek();

            if (is_code_start(ch)){
                read_next = read_next_in_code;
                return { type: "code", value: "{{" };
            }
            return read_text();
        }
        function read_text(){
            var str = read_while( (ch) => {return ch != '{';} );

            return { type: "text", value: str };
        }
        function read_next_in_code(){
            read_while(is_whitespace);
            if (input.eof()) return null;
            var ch = input.peek();

            if (is_code_end(ch)){
                read_next = read_next_out_code;
                return { type: "code", value: "}}" };
            }
            //if (is_op(ch)) return read_op();
            if (is_str_start(ch)) return read_string();
            if (is_var_in_str(ch)) return read_var_in_str();
            if (is_punc(ch)) return {
                type  : "punc",
                value : input.next()
            }
            if (is_op(ch)) return {
                type  : "op",
                value : input.next()
            }
            if (is_num(ch)) return read_num();
            if (is_ident(ch)) return read_ident();
            input.croak("Can't handle character: " + ch);
        }

        function read_while(predicate) {
            var str = "";
            while (!input.eof() && predicate(input.peek()))
                str += input.next();
            return str;
        }

        function read_string(){
            var str = "";

            if(input.peek() === '`') input.next();

            while (!input.eof()){
                if(is_str_end(input.peek())){
                    input.next();
                    return { type: "str", value: str };
                }

                if(is_var_in_str(input.peek())) return { type: "str", value: str };

                str += input.next();
            }

            function is_str_end(ch){
                return "`".indexOf(ch) >= 0;
            }
        }
        function read_var_in_str(){
            input.next();input.next();
            return { type: "punc", value: '${' };
        }
        function read_num(){
            var num = parseInt(read_while(is_num));
            return { type: "num", value: num };
        }
        function read_ident() {
            var ident = read_while(is_ident);
            return { type  : "var", value : ident };
        }

        function is_whitespace(ch){
            return " \t\n".indexOf(ch) >= 0;
        }
        function is_code_start(ch){
            if(ch === '{' && input.peek(2) === '{'){
                input.next();input.next();
                return true;
            }
            return false;
        }
        function is_code_end(ch){
            if(ch === '}' && input.peek(2) === '}'){
                input.next();
                input.next();
                return true;
            }
            return false;
        }
        function is_str_start(ch){
            if( ch === '`' || input.before() === '}') return true;
        }
        function is_var_in_str(ch){
            return ch === '$';
        }
        function is_punc(ch){
            return ",;(){}".indexOf(ch) >= 0;
        }
        function is_op(ch){
            return "+-*/=".indexOf(ch) >= 0;
        }
        function is_num(ch){
            return /[0-9]/i.test(ch);
        }
        function is_ident(ch){
            return /[a-zλ_]/i.test(ch);
        }

        function peek(){
            return current || (current = read_next());
        }
        function next(){
            var tok = current;
            current = null;
            return tok || read_next();
        }
        function eof(){
            return peek() == null;
        }
    }

    function parseDynamicHtml(input){

        var html = [];
        while (!input.eof()){
            var result = parse_html();
            if(result) html.push(result);
        }
        return { type: "html", html: html };

        function parse_html(){
            var tok = input.peek();

            if(is_text(tok)) return parse_text();
            if(is_code(tok)) return parse_code();
            if(is_code_end(tok)) return null;
            return input.next();
        }

        function is_text(tok){
            if(tok.type === 'text') return true;
            return false;
        }
        function is_code(tok){
            if(tok.type === 'code' && tok.value === '{{'){
                input.next();
                return true;
            }
            return false;
        }
        function is_code_end(tok){
            if(tok.type === 'code' && tok.value === '}}'){
                input.next();
                return true;
            }
            return false;
        }

        function parse_text(){
            return input.next();
        }
        function parse_code(){
            var tok = input.next();

            if(is_call(tok)) return parse_call(tok);
            if(is_str(tok)) return parse_str(tok);
            //if(is_bin_exp(tok)) return parse_str();
            //if(is_end(tok)) return parse_str();
            if(is_num(tok)) return parse_num(tok);
        }

        function parse_call(tok){
            return { type : 'call', func : tok.value, arguments : get_arguments()}
        }
        function parse_str(tok){
            var parts = [];
            parts.push(tok);

            while (!input.eof()){
                if(is_str(input.peek())){
                    parts.push(input.next());
                    continue;
                }
                if(is_var_in_str(input.peek())){
                    input.next();
                    parts.push(parse_code());
                    skip_punc('}');
                    continue;
                }
                break;
            }
            return { type: "str", parts: parts };

            function is_var_in_str(tok){
                return tok.value === '${' && tok.type == "punc";
            }
        }
        function parse_num(tok){
            return tok;
        }

        function is_str(tok){
            if(tok.type === 'str') return true;
            return false;
        }
        function is_call(tok){
            if(is_punc('(')) return true;
            return false;
        }
        function is_num(tok){
            if(tok.type === 'num') return true;
            return false;
        }

        function is_punc(ch) {
            var tok = input.peek();
            return tok && tok.type == "punc" && (!ch || tok.value == ch) && tok;
        }
        function get_arguments(){
            var arg = [], first = true;
            skip_punc('(');
            while (!input.eof()) {
                if (is_punc(')')) break;
                if (first) {first = false;}else {skip_punc(',');}
                if (is_punc(')')) break;
                arg.push(parse_code());
            }
            skip_punc(')');
            return arg;
        }
        function skip_punc(ch) {
            if (is_punc(ch)) input.next();
            else input.croak("Expecting punctuation: \"" + ch + "\"");
        }
    }

    function interpretDynamicHtml(input,callback){
        var html = '';
        var arr = input.html;
        var promiseArr = [];

        for(let i=0;i<arr.length;i++){
            var promise = new Promise(function(resolve, reject) {
                interpret(arr[i],function(result){
                    arr[i] = result;
                    resolve();
                });
            });
            promiseArr.push(promise);
        }

        Promise.all(promiseArr).then(function(){
            for(var i=0;i<arr.length;i++){
                html += arr[i];
            }

            callback(html);
        });


        function interpret(input,callback){
            if(input.type === 'text') callback(input.value);
            if(input.type === 'num') callback(interpret_num(input));
            if(input.type === 'call') interpret_call(input,callback);
            if(input.type === 'str') interpret_str(input,callback);
        }

        function interpret_call(input,callback){
            var arg = [];
            var promiseArr = [];

            for(let i=0;i<input.arguments.length;i++){
                arg[i] = input.arguments[i];
                var promise = new Promise(function(resolve, reject) {
                    interpret(arg[i],function(result){
                        arg[i] = result;
                        resolve();
                    });
                });
                promiseArr.push(promise);
            }

            Promise.all(promiseArr).then(function(){
                call(input.func,arg,callback);
            });
        }
        function interpret_str(input,callback){
            if(!input.parts) callback(input.value);

            var text = '';
            var arr = input.parts;
            var promiseArr = [];

            for(let i=0;i<arr.length;i++){
                var promise = new Promise(function(resolve, reject) {
                    interpret(arr[i],function(result){
                        arr[i] = result;
                        resolve();
                    });
                });
                promiseArr.push(promise);
            }

            Promise.all(promiseArr).then(function(){
                for(var i=0;i<arr.length;i++){
                    text += arr[i];
                }
                callback(text);
            });
        }
        function interpret_num(input){
            return input.value;
        }
    }

    function demo(){
        //var code = "asd  af{{ajax (`/homePgae/${getPathname(13 + 126,12, a  = 5,`asf449`)}/test`)}}sadfsf";
        var code = "asd  af   {{ajax (`/user/${getPathname(2)}/username`)}}  sadfsf";

        console.log(code);

        var input = inputStream(code);
        var token = tokenStream(input);
        var parse = parseDynamicHtml(token);
        interpretDynamicHtml(parse,function(result){
            console.log(result);
        });
        console.log(parse);
    }
})();

module.exports = tokenStream;

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



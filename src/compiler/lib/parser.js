module.exports = {
    parseDynamicHtml,
    parseCode
};

const lexer = require('./lexer');

function parseDynamicHtml(code){
    var input = lexer(code);

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
        if(is_ident(tok)) return parse_ident(tok);
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
    function parse_ident(tok){
        return tok;
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
    function is_ident(tok){
        if(tok.type === 'var') return true;
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

function parseCode(code){
    var input = lexer(code);

    return { type: "code", value: parse_code() };
}

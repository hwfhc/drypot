const letter = [a-zA-Z];
const digit = [0-9];
const punc = '(' | ')' | '{' | '}' | ',' | '`' | '${' | '{{' | '}}';

const ident = letter , { letter | '_' };
const str = '`' , { digit | letter | ('${' , { letter | digit } , '}') } , '`';
const text = { digit | letter | ' ' | punc };

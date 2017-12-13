const exec = require('./spec')

exec('asd{{read(file,`asdf`)}}', data => {
    console.log(data);
});

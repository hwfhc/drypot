const exec = require('./spec')

exec('my name is {{t.a}} 165', (err,data) => {
    if(err)
        console.log(err);
    else
        console.log(data);
});

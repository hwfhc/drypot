const exec = require('./spec')

exec('my name is {{test(bool)}}', (err,data) => {
    if(err)
        console.log(err);
    else
        console.log(data);
});

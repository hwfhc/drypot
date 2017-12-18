const exec = require('./spec')

exec('my name is {{test(`/dp_dynamic/1/username`)}}', (err,data) => {
    if(err)
        console.log(err);
    else
        console.log(data);
});

const exec = require('./spec')

exec('my name is {{ajax(`/dp_dynamic/1/username`)}}', data => {
    console.log(data);
});

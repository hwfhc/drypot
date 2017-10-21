module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/',function(req,res){
        res.sendFile(`${directory}/views/index.html`);
    });
    app.get('/page/:page',function(req,res){
        res.sendFile(`${directory}/views/${req.params['page']}.html`);
    });

    app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.paramsfile);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.paramsfile);
    });

    app.get('/drypot.min.js',function(req,res){
        res.sendFile(`${directory}/drypot.min.js`);
    });

    require('./dp_component')(app,directory);
    require('./dp_dynamic')(app,directory);
    require('./dp_for')(app,directory);
    require('./dp_if')(app,directory);
}

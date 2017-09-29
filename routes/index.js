module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/',function(req,res){
        res.sendFile(directory + '/views/index.html');
    });

     app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.paramsfile);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.paramsfile);
    });

    app.get('/core',function(req,res){
        res.sendFile(directory + '/core/core.js');
    });

    app.get('/components/:file',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.html`);
    });

    app.get('/components/:file/index.css',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.css`);
    });


    app.get('/user/0/username',function(req,res){
        res.send('asdf');
    });

}

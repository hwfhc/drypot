module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/home/:id/test',function(req,res){
        res.sendFile(directory + '/views/index.html');
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

    app.get('/components/:file',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.html`);
    });

    app.get('/components/:file/index.css',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.css`);
    });


    app.get('/user/:id/username',function(req,res){
        res.send('!!!' + req.params['id'] + '???');
    });

}

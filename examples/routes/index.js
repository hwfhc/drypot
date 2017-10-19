module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/',function(req,res){
        res.redirect('/home/1/test');
    });
    app.get('/home/:id/test',function(req,res){
        res.sendFile(directory + '/views/index.html');
    });

    app.get('/test',function(req,res){
        var data = {
            first: 'first',
            two: 'two',
            bool: true
        };
        res.send(JSON.stringify(data));
    });

    app.get('/render',function(req,res){
        var data = [
            'wawa',
            'hehe',
            'fuck'
        ]
        res.send(JSON.stringify(data));
    });

    app.get('/first',function(req,res){
        var data = [
            {title:'1'},
            {title:'daf'},
            {title:'xafea1'},
            {title:'asdfawef1'},
        ]
        res.send(JSON.stringify(data));
    });

    app.get('/user/:id/username',function(req,res){
        res.send('!!!' + req.params['id'] + '???');
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


}

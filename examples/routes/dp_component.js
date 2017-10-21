module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/components/:file',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.html`);
    });

    app.get('/components/:file/index.css',function(req,res){
        res.sendFile(`${directory}/components/${req.params['file']}/index.css`);
    });
}

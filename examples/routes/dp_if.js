module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/dp_if/true',function(req,res){
        var data = true;

        res.send(JSON.stringify(data));
    });

    app.get('/dp_if/false',function(req,res){
        var data = false;

        res.send(JSON.stringify(data));
    });

}

module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/dp_if/1',function(req,res){
        var data = {
            first: 'first',
            two: 'two',
            bool: true
        };
        res.send(JSON.stringify(data));
    });
}

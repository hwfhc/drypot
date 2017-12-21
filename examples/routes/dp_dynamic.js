module.exports = initRoutes;

function initRoutes(app,directory){
    app.get('/dp_dynamic/data',(req,res) => {
        var data = {
            first: 'hello',
            last: 'world'
        };
        res.send(JSON.stringify(data));
    });

    app.get('/dp_dynamic/:id/username',(req,res) => {
        res.send(`hwfhc, ${req.params['id']}`);
    });
}

module.exports = initRoutes;

function initRoutes(app,directory){
   app.get('/dp_for/1',(req,res) => {
        var data = [
            'item1',
            'item2',
            'item3'
        ]
        res.send(JSON.stringify(data));
    });

    app.get('/dp_for/2',(req,res) => {
        var data = [
            { title: 'first',description: 'i am first' },
            { title: 'two' ,description: 'i am two' },
            { title: 'three', description: 'i am three' },
            { title: 'four', description: 'i am four' }
        ]
        res.send(JSON.stringify(data));
    });
}

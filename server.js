/* https://www.npmjs.com/package/diskdb */
var express = require('express');
var app = express();
var db = require('diskdb');
var bodyParser = require('body-parser');
db = db.connect('./db', ['movies']);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    return res.send('Bienvenidos a la api de peliculas');
});
app.get('/peliculas/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    return res.send(db.movies.findOne({_id: id}));
});

app.get('/peliculas', function (req, res) {
    return res.send(db.movies.find());
});

app.post('/peliculas', function (req, res) {
    console.log(req.body)
    db.movies.save(req.body);
    return res.send({ msg: 'La pelicula ha sido guardada' })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

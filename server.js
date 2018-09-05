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
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    return res.send('Bienvenidos a la api de peliculas');
});
app.get('/peliculas/:id', function (req, res) {
    var id = req.params.id;
    return res.send(db.movies.findOne({ _id: id }));
});

app.get('/peliculas', function (req, res) {
    return res.send(db.movies.find());
});

app.post('/peliculas', function (req, res) {
    if (validateFilm(req.body)) {
        var toSave = {
            title: req.body.title,
            description: req.body.description,
            score: req.body.score,
            poster: req.body.poster,
            cast: req.body.cast,
            gender: req.body.gender
        }
        db.movies.save(toSave);
        return res.send({ msg: 'La pelicula ha sido guardada' })
    } else {
        return res.serverError({msg: 'Hubo un error al guardar la pelicular', fields: 'title, description, score, poster, cast, gender'})
    }
})

function validateFilm(film) {
    return film.title && film.description && film.score && film.poster && film.cast && film.gender;
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

const {Movie, validate} = require('./movie.model');
const {Genre} = require('../genres/genre.model');

exports.index = async (req, res) => {
    try {
        const movies = await Movie.find().sort('title');
        res.send(movies);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.show = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send(movie);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.store = async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        res.status(400).json({
            error: { message: error.details[0].message }
        });
    }
    try {
        const genre = await Genre.findById(req.body.genreId);
        if(!genre) {
            res.status(400).json({
                error: { message: 'Invalid Genre' }
            });
        }
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        movie = await movie.save();
        res.status(201).send(movie);
    } catch(err) {
        res.status(400).json({
            error: { message: err.message }
        });
    }
};

exports.update = async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        res.status(400).json({
            error: { message: error.details[0].message }
        });
    }
    try {
        const genre = await Genre.findById(req.body.genreId);
        if(!genre) {
            res.status(400).json({
                error: { message: 'Invalid Genre' }
            });
        }
        const movie = await Movie.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name,
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            },
            { new: true }
        );
        res.send(movie);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.destroy = async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id });
        res.send(movie);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};
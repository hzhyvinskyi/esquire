const {Genre, validate} = require('./genre.model');

exports.index = async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.show = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
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
        let genre = new Genre({ name: req.body.name });
        genre = await genre.save();
        res.status(201).send(genre);
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
        const genre = await Genre.findOneAndUpdate(
            { _id: req.params.id },
            { name: req.body.name },
            { new: true }
        );
        res.send(genre);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.destroy = async (req, res) => {
    try {
        const genre = await Genre.findOneAndDelete({ _id: req.params.id });
        res.send(genre);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
}
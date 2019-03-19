const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {genreSchema} = require('../genres/genre.model');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(3).max(30),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required().min(0).max(1000),
        dailyRentalRate: Joi.number().required().min(3).max(100)
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
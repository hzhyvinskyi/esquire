const {Rental, validate} = require('./rental.model');
const {Customer} = require('../customers/customer.model');
const {Movie} = require('../movies/movie.model');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

exports.index = async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
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
        const customer = await Customer.findById(req.body.customerId);
        if(!customer) {
            res.status(400).json({
                error: { message: 'Invalid customer' }
            });
        }
        const movie = await Movie.findById(req.body.movieId);
        if(!movie) {
            res.status(400).json({
                error: { message: 'Invalid movie' }
            });
        }
        if(movie.numberInStock === 0) {
            res.status(400).json({
                error: { message: 'Movie is not in stock' }
            });
        }
        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.status(201).send(rental);
    } catch(err) {
        res.status(400).json({
            error: { message: err.message }
        });
    }
};
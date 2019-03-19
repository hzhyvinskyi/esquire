const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 30
            },
            isGold: {
                type: Boolean,
                required: true,
                default: false
            },
            phone: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 30
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 30
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 100
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
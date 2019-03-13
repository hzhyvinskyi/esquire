const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(3).max(30),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(3).max(30)
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
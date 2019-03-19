const {Customer, validate} = require('./customer.model');

exports.index = async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.show = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
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
        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });
        customer = await customer.save();
        res.status(201).send(customer);
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
        const customer = await Customer.findOneAndUpdate(
            { _id: req.params.id }, {
                name: req.body.name,
                isGold: req.body.isGold,
                phone: req.body.phone
            }, { new: true }
        );
        res.send(customer);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};

exports.destroy = async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ _id: req.params.id });
        res.send(customer);
    } catch(err) {
        res.status(404).json({
            error: { message: err.message }
        });
    }
};
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    mongoURI = 'mongodb://localhost/esquire';
} else if(process.env.NODE_ENV ==='test') {
    mongoURI = 'mongodb://localhost/esquire-test';
}

module.exports = {mongoURI};
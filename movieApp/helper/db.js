const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://kerembilim:a123456@ds221003.mlab.com:21003/movie-api', { useNewUrlParser: true });

    mongoose.connection.on('open', () => {
         console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });


};

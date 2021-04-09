var mongoose = require('mongoose');
var config = require('config');
var db = config.get('mongoURI');

const connectDB = async () => {
    try {
        mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
        console.log('Mongo DB connection Success..');
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = connectDB;
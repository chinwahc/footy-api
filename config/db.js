var db = require('mongoose');
const config = require('config');

db.connect(config.get('mongodb+srv://chinwahc:Chelsea4life@footy-db-ss1aq.mongodb.net/test?retryWrites=true&w=majority'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
//db.connect(config.get('database.url'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });


module.exports = db;

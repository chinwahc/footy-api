var db = require('mongoose');
const config = require('config');

db.connect(config.get('database.url'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

module.exports = db;
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
//configure express app to parse json content and form data
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let mongoose = require('mongoose');
const config = require('config');
//configure express app to allow cross-origin requests
app.use(require('./middleware/headers'));
app.use('/api/', require('./routes/players'));
//configure express app to serve static files
app.use(express.static(path.join(__dirname, 'public')));
//connect to mongodb instance where database is footydb
mongoose.connect(config.get('database.url'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error..'));
db.once('open', function callback() {
    console.log('Footy database is now up and running');
});

// default route
app.get('/', (req, res) => {
    res.json("Welcome to Footy API. To get all players, add '/players' to the url.");
});
//listen on port 3001
app.listen(3001, () => {
    console.log('The footy-api server listening on port 3001')
});

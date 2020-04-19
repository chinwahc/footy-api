let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let mongoose = require('mongoose');
const config = require('config');
require('./routes/player.routes.js')(app);

//import Player Model from ./models
let Player = require('./models/players.js');
//initialize express app
let cors = require("cors");
//configure express app to allow cross-origin requests
app.use(require('./middleware/headers'));
//app.use(cors());
//configure express app to parse json content and form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure express app to serve static files
app.use(express.static(path.join(__dirname, 'public')));
//connect to mongodb instance where database is footydb
mongoose.connect(config.get('database.url'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error..'));
db.once('open', function callback() {
    console.log('Footy database is now up and running');
});
//mongoose.Promise = global.Promise;
// Connecting to the database
// mongoose.connect(config.get('database.url'), {
//     useNewUrlParser: true, useUnifiedTopology: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });
//save new player
// app.post('/player', (req, res, next) => {
//     //create new player using schema
//     let newPlayer = new Player({
//         name: req.body.name,
//         gamesPlayed: req.body.gamesPlayed,
//         goalsScored: req.body.goalsScored,
//         assists: req.body.assists,
//         wins: req.body.wins,
//         draws: req.body.draws,
//         losses: req.body.losses,
//         motmAwards: req.body.motmAwards,
//         potmAwards: req.body.potmAwards,
//         potyAwards: req.body.potyAwards,
//         totyAppearances: req.body.totyAppearances,
//         averageRating: req.body.averageRating
//     });
// //     //save new player to db
//     newPlayer.save((err, result) => {
//         if (err) { console.log(err) }
//         else { res.json(result) }
//     })
// });
// default route
app.get('/', (req, res) => {
    res.json("Welcome to Footy API. To get all players, add '/players' to the url.");
});
// app.get('/players', (req, res, next) => {
//     //use find() method to return all players
//     Player.find((err, result) => {
//         if(err) { console.log(err) }
//         else { res.json(result) }
//     });
// });
// app.get(`/players/name/:name`, (req, res) => {
//     const playerName = req.params.name;
//     const getPlayer = Player.find((result) => result.name === playerName);
//     if (!getPlayer) {
//         res.status(500).send('Player not found.')
//     } else {
//         res.json(getPlayer);
//     }
// });
// app.get('/players/:name', (req, res) => {
//     // Reading name from the URL
//     const name = req.params.name;
//     // Searching players for the name
//     for (let player of Player) {
//         if (player.name === name) {
//             res.json(player);
//             return;
//         }
//     }
//     // Sending 404 when not found something is a good practice
//     res.status(404).send('Player not found');
// });
// app.delete('/players/:name', (req, res) => {
//     // Reading name from the URL
//     const name = req.params.name;
//     // Remove player from the players array
//     players = players.filter(i => {
//         if (i.name !== name) {
//             return true;
//         }
//         return false;
//     });
//
//     res.send('Player is deleted:' + name );
// });
//listen on port 3000
app.listen(3001, () => {
    console.log('The footy-api server listening on port 3001')
});
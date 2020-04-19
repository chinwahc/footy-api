module.exports = (app) => {
    const players = require('../controllers/player.controller.js');
    const Player = require('../models/players.js');


    // Create a new Player
    app.post('/players', players.create);

    // Retrieve all Players
    app.get('/players', players.findAll);

    // Retrieve a single Player with playerId
    app.get('/players/id/:playerId', players.findOne);

    // Retrieve a single Player with name
    app.get('/players/name/:name', players.findOne);

    // Update a Note with playersId
    app.put('/players/:playerId', players.update);

    // Delete a Note with playerId
    app.delete('/players/:playerId', players.delete);
};
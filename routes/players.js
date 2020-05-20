var router = require('express').Router();
var Player = require('../models/players');

// Retrieve all players from the database.
router.get('/players', (req, res) => {
    Player.find().sort({"goalsScored":-1})
        .then(players => {
            res.json(players);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving players."
        });
    });
    });

//Create new Player
router.post('/player', (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Player content cannot be empty"
        });
    }
    let newPlayer = new Player({
        name: req.body.name,
        gamesPlayed: req.body.gamesPlayed,
        goalsScored: req.body.goalsScored,
        assists: req.body.assists,
        wins: req.body.wins,
        draws: req.body.draws,
        losses: req.body.losses,
        motmAwards: req.body.motmAwards,
        potmAwards: req.body.potmAwards,
        potyAwards: req.body.potyAwards,
        totyAppearances: req.body.totyAppearances,
        averageRating: req.body.averageRating
    });
//     // Save Player in the database
    newPlayer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the player."
        });
    });
});


// Update a player
router.put('/player/:playerId', (req, res) => {
     if(!req.body) {
         return res.status(400).send({
             message: "Player content can not be empty"
         });
     }
    Player.findByIdAndUpdate(req.params.playerId, {
        name: req.body.name,
        gamesPlayed: req.body.gamesPlayed,
        goalsScored: req.body.goalsScored,
        assists: req.body.assists,
        wins: req.body.wins,
        draws: req.body.draws,
        losses: req.body.losses,
        motmAwards: req.body.motmAwards,
        potmAwards: req.body.potmAwards,
        potyAwards: req.body.potyAwards,
        totyAppearances: req.body.totyAppearances,
        averageRating: req.body.averageRating
    }, {new: true})
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: `Player with id:'${req.params.playerId}' not found`
                });
            }
            res.send(player);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Player with id:'${req.params.playerId}' not found`
            });
        }
        return res.status(500).send({
            message: `Something went wrong updating player with id:'${req.params.playerId}'`
        });
    });
});

// Delete a player with the specified playerId in the request
router.delete('/player/:playerId', (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: `Player with id:'${req.params.playerId}' not found`
                });
            }
            res.send({message: `Player with id:'${req.params.playerId}' deleted successfully`})
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Player with id:'${req.params.playerId}' not found`
            });
        }
        return res.status(500).send({
            message: `Could not delete player with id:'${req.params.playerId}'`
        });
    });
});

// Find a single player with a playerId
router.get('/player/id/:playerId', (req, res) => {
    Player.findById(req.params.playerId)
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: `Player with id:'${req.params.playerId}' not found`
                });
            }
            res.json({player:player});
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Player with id:'${req.params.playerId}' not found`
            });
        }
        return res.status(500).send({
            message: `Something went wrong updating player with id:'${req.params.playerId}'`
        });
    });
});

// Find a single player with a name
router.get('/player/name/:name', (req, res) => {
    Player.findOne({name: req.params.name})
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: `Player with name:'${req.params.name}' not found, please check name and try again`
                });
            }
            res.json({player:player});
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with name " + req.params.name
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving player with name " + req.params.name
        });
    });
});

module.exports = router;

const Player = require('../models/players.js');

//Create new Player
exports.create = (req, res) => {
    // Request validation
    // Create a Player
     const newPlayer = new Player({
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
    if(!req.body) {
        return res.status(400).send({
            message: "Player content cannot be empty"
        });
    }

    // Save Player in the database
    newPlayer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the player."
        });
    });
};

// Retrieve all players from the database.
exports.findAll = (req, res) => {
    Player.find()
        .then(players => {
            res.send(players);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving players."
        });
    });
};

// Find a single player with a playerId
exports.findOne = (req, res) => {
    Player.findById(req.params.playerId)
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.send(player);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving player with id " + req.params.playerId
        });
    });
};

// Find a single player with a name
// exports.findOne = (req, res) => {
//     Player.findOne({name: req.params.name})
//         .then(player => {
//             if(!player) {
//                 return res.status(404).send({
//                     message: `Player with name:'${req.params.name}' not found, please check name and try again`
//                 });
//             }
//             res.send(player);
//         }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Player not found with name " + req.params.name
//             });
//         }
//         return res.status(500).send({
//             message: "Something wrong retrieving player with name " + req.params.name
//         });
//     });
// };

// Update a player
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }

    // Find and update player with the request body
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
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.send(player);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.playerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: "Player not found with id " + req.params.playerId
                });
            }
            res.send({message: "Player deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Could not delete player with id " + req.params.playerId
        });
    });
};
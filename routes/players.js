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

// Retrieve top scorers from the database.
router.get('/topScorers', (req, res) => {
    Player.find().sort({"goalsScored":-1})
        .then(players => {
            let topScorers = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored
                }
            });
           // Sort by goalsScored first, then sort by gamesPlayed
            res.json(topScorers.sort((a, b) => b.goalsScored - a.goalsScored || a.gamesPlayed - b.gamesPlayed));
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top scorers."
        });
    });
});


// Retrieve top scorer.
router.get('/topScorer', (req, res) => {
    Player.find().sort({"goalsScored":-1})
        .then(players => {
            let topScorers = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored
                }
            });
            let topScorer = topScorers.sort((a, b) => b.goalsScored - a.goalsScored || a.gamesPlayed - b.gamesPlayed)
            res.json(topScorer[0]);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving top scorer."
        });
    });
});

// Retrieve top assists from the database.
router.get('/topAssists', (req, res) => {
    Player.find().sort({"assists":-1})
        .then(players => {
            let topAssists = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    assists: player.assists
                }
            });
            res.json(topAssists.sort((a, b) => b.assists - a.assists || a.gamesPlayed - b.gamesPlayed));
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top assists."
        });
    });
});

// Retrieve top creator.
router.get('/topCreator', (req, res) => {
    Player.find().sort({"assists":-1})
        .then(players => {
            let topCreators = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    assists: player.assists
                }
            });
            let topCreator = topCreators.sort((a, b) => b.assists - a.assists || a.gamesPlayed - b.gamesPlayed)
            res.json(topCreator[0]);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving top creator."
        });
    });
});

// Retrieve top rated players from the database.
router.get('/topRatedPlayers', (req, res) => {
    Player.find().sort({"averageRating":-1})
        .then(players => {
            let topRated = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    averageRating: player.averageRating
                }
            });
            res.json(topRated.sort((a, b) => b.averageRating - a.averageRating || a.gamesPlayed - b.gamesPlayed));
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top rated players."
        });
    });
});

// Retrieve the top rated player from the database.
router.get('/topRatedPlayer', (req, res) => {
    Player.find().sort({"averageRating":-1})
        .then(players => {
            let topRated = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    averageRating: player.averageRating
                }
            });
            // Sort by averageRating, if ratings are the same, then return highest ratings with the least amount of gamesPlayed
            let topRatedPlayer = topRated.sort((a, b) => b.averageRating - a.averageRating || a.gamesPlayed - b.gamesPlayed)
            res.json(topRatedPlayer[0]);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving the top rated player."
        });
    });
});

// Retrieve top winners from the database.
router.get('/topWinners', (req, res) => {
    Player.find().sort({"wins":-1})
        .then(players => {
            let topWinners = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    wins: player.wins
                }
            });
            res.json(topWinners.sort((a, b) => b.wins - a.wins || a.gamesPlayed - b.gamesPlayed));
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top winners."
        });
    });
});

// Retrieve the top winner from the database.
router.get('/topWinner', (req, res) => {
    Player.find().sort({"wins":-1})
        .then(players => {
            let topWinners = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    wins: player.wins
                }
            });
            //incase players have the same number of wins, sort by wins and then gamesPlayed, implement this if issue arises
            let topWinner = topWinners.sort((a, b) => b.wins - a.wins || a.gamesPlayed - b.gamesPlayed)
            res.json(topWinner[0]);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top winners."
        });
    });
});


// Retrieve most goal involvments from the database.
router.get('/goalContributions', (req, res) => {
    Player.find().sort({"goalsScored":-1})
        .then(players => {
            let topGoalAssists = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    assists: player.assists,
                    goalContributions: player.goalsScored + player.assists
                }
            });
            res.json(topGoalAssists.sort((a, b) => b.goalContributions - a.goalContributions || a.gamesPlayed - b.gamesPlayed))
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving list of top goal contributors."
        });
    });
});

// Retrieve the top goal contributor(goals plus assists)s from the database.
router.get('/topGoalContributor', (req, res) => {
    Player.find().sort({"goalsScored":-1})
        .then(players => {
            let topGoalContributors = players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    gamesPlayed: player.gamesPlayed,
                    goalsScored: player.goalsScored,
                    assists: player.assists,
                    goalContributions: player.goalsScored + player.assists
                }
            });
            let topGoalContributor = topGoalContributors.sort((a, b) => b.goalContributions - a.goalContributions || a.gamesPlayed - b.gamesPlayed)
            res.json(topGoalContributor[0]);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving top goal contributor."
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

     // Save Player in the database
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

let mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true
    },
    gamesPlayed: Number,
    goalsScored: Number,
    assists: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    motmAwards: Number,
    potmAwards: Number,
    potyAwards: Number,
    totyAppearances: Number,
    averageRating: Number
},
    {timestamps: true},
    { collection: 'players' });
let Player = mongoose.model('Players', playerSchema);
module.exports = Player;
//module.exports = mongoose.model('Players', playerSchema);
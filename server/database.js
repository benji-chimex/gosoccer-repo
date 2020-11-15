let mongoose = require("mongoose");
// let database = "GoSoccer";
// let host = "127.0.0.1:27017";
let Schema = mongoose.Schema;

// Database connection
let connectDB = () => {
    mongoose.connect(`mongodb+srv://ben1234:1234567.@gosoccer-cluster.bw77g.mongodb.net/gosoccer-Cluster?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("Connection to database was successful")
    }).catch((err) => {
        console.log(err);
    })
}

//Models and Schemas
let userSchema = new Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    profilePic: {type: String, required: true}
})
let teamSchema = new Schema({
    teamname: {type: String, required: true},
    user: {type: String, required: true},
    players: [
        {
            playername: {type: String},
            player_worth: {type: String},
            player_points: [
                {type: Number, default: 0}
            ],
            club: {type: String},
            country: {type: String},
            age: {type: String},
            position: {type: String}
        }
    ],
    points: [{type: Number, default: 0}],
    rating: {type: Number, default: 0},
    netWorth: {type: Number, default: 100000000}
})
let betSchema = new Schema({
    betID: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    currentDate: {type: Date, default: Date.now()},
    payoutDate: {type: Date, default: Date.now()},
    bets: [
        {
            fixture: {type: String, required: true},
            label_name: {type: String, required: true},
            value: {type: String, required: true},
            odd: {type: Number, required: true},
            event_date: {type: Date, required: true}
        }
    ],
    betStatus: {type: String, default: "Not Completed"}
})

let userModel = mongoose.model("User", userSchema);
let teamModel = mongoose.model("Team", teamSchema);
let betModel = mongoose.model("Bet", betSchema);

// Exporting Module
module.exports = { connectDB, userModel, teamModel, betModel};
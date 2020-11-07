require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
let crypto = require("crypto");
const bcrypt = require("bcrypt");
const app = express();
const history = require("connect-history-api-fallback");
const path = require("path");
const db = require("./database");
const UserModel = db.userModel;
const TeamModel = db.teamModel;
const BetModel = db.betModel;
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../dist/uploads");
    },
    filename: function(req, file, cb) {
        let originalname = file.originalname;
        let filename = "gosoccer" + "-" + originalname;
        cb(null, filename);
    }
});
let upload = multer({storage: storage});

//Database Connection
db.connectDB();

//Configurations
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/public", express.static(path.resolve(__dirname, "../dist")));

// Avoid SPA
app.get("/profile/:user", (req, res) => {
    UserModel.findOne({
        username: req.params.user
    }).then(doc => {
        res.json(doc);
    }).catch(err => console.error(err));
})


app.use(history({
    index: "/"
}));

// Path Functions
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

app.post("/signup", upload.single("file"), async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(salt);
        // console.log(hashedPassword)
        let user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            profilePic: req.body.filepath
        }).save((err, docs) => {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.redirect(302, "/login");
        })
    } catch (err) {
        console.log(err);   
    }
})

app.post("/login", (req, res) => {
    UserModel.findOne({
        username: req.body.username
    }).then(async (doc) => {
        // console.log(doc);
        try {
            let passwordCheck = await bcrypt.compare(req.body.password, doc.password);
            if(passwordCheck) {
                    // jwt Authorization
                let authUser = {username: req.body.username};
                let accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN);
                res.json({accessToken: accessToken});
                // res.redirect(302, "/");
            }
            else {
                res.sendStatus(401);
            }
        } catch (err) {
            console.log(err);
        }
    }).catch((err) => console.log(err));
})

app.post("/profile", (req, res) => {
    let token = req.body.accessToken;
    
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) {
                res.status(403).send("Invalid Token");
            }
            res.json(user.username);
        })
    }
    else if(!token) {
        res.status(401).send("You are not logged in");
    }
})

app.post("/betting", (req, res) => {
    let token = req.body.accessToken;
    
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) {
                res.status(403).json("error");
            }
            res.json(user.username);
        })
    }
    else if(!token) {
        res.status(401).json("error");
    }
})

app.post("/fantasy", (req, res) => {
    let token = req.body.accessToken;
    
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) {
                res.status(403).json("error");
            }
            res.json(user.username);
        })
    }
    else if(!token) {
        res.status(401).json("error");
    }
})

app.post("/fantasy/teams", (req, res) => {
    let body = req.body;
    TeamModel.findOne({
        teamname: body.teamname,
        user: body.username
    }).then(doc => {
        if(doc === null) {
            let team = new TeamModel({
                teamname: body.teamname,
                user: body.username
            });
            team.save().then(doc => {
                res.json({username: doc.user, teamname: doc.teamname});
            }).catch(err => console.log(err));
        } else {
            res.json({username: doc.user, teamname: doc.teamname});
        }
    })
})

app.post("/fantasy/team", (req, res) => {
    let body = req.body;
    TeamModel.findOne({
        teamname: body.teamname
    }).then(doc => {
        let data = {
            teamName: doc.teamname,
            points: doc.points.reduce((acc, el) => {
                return acc + el;
            }, 0),
            rating: doc.rating,
            signings: doc.players.length,
            user: doc.user,
            netWorth: doc.netWorth
        }
        res.json(data);
    }).catch(err => console.log(err));
})

app.post("/fantasy/myteam", (req, res) => {
    let body = req.body;
    TeamModel.findOne({
        teamname: body.teamname
    }).then(doc => {
        let data = {
            teamName: doc.teamname,
            points: doc.points.reduce((acc, el) => {
                return acc + el;
            }, 0),
            rating: doc.rating,
            signings: doc.players.length,
            user: doc.user,
            players: doc.players,
            netWorth: doc.netWorth
        }
        res.json(data);
    }).catch(err => console.log(err));
})


app.post("/buy", (req, res) => {
    let body = req.body;
    TeamModel.findOne({
        teamname: body.teamname
    }).then(doc => {
        let data = {
            playername: body.playername,
            player_worth: body.player_worth,
            club: body.club,
            country: body.country,
            age: body.age,
            position: body.position
        }
        doc.players.push(data);
        doc.netWorth = doc.netWorth - body.player_worth;
        doc.save((err, doc) => {
            if(err) {
                console.log(err);
            } else {
                // console.log(doc);
                res.json({player: body.playername, msg: "ok"});
            }
        })
    }).catch(err => console.log(err));
})

app.post("/betslip", (req, res) => {
    let body = req.body;
    if(body.betToken === undefined || body.betToken === null) {
        let authBet = {betname: body.user};
        let betToken = jwt.sign(authBet, process.env.BET_TOKEN);
        UserModel.findOne({
            username: body.user
        }).then(doc => {
            let bet = new BetModel({
                betID: betToken,
                username: doc.username,
                email: doc.email,
                bets: [
                    {
                        fixture: body.fixture, 
                        label_name: body.label_name, 
                        value: body.value, 
                        odd: body.odd, 
                        event_date: body.event_date
                    }
                ]
            });
            bet.save().then(doc => {
                res.json({betToken: betToken, msg: "Your bet have been registered"});
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    } else {
        BetModel.findOne({
            betID: body.betToken
        }).then(doc => {
            if(doc.betStatus === "Not Completed") {
                let data = {
                    fixture: body.fixture, 
                    label_name: body.label_name, 
                    value: body.value, 
                    odd: body.odd, 
                    event_date: body.event_date
                }
                doc.bets.push(data);
                doc.save().then(doc => {
                    // console.log(doc);
                    res.json({msg: "Your bet have been registered"});
                }).catch(err => console.log(err)); 
            } else {
                let authBet = {betname: body.user};
                let betToken = jwt.sign(authBet, process.env.BET_TOKEN);
                UserModel.findOne({
                    username: body.user
                }).then(doc => {
                    let bet = new BetModel({
                        betID: betToken,
                        username: doc.username,
                        email: doc.email,
                        bets: [
                            {
                                fixture: body.fixture, 
                                label_name: body.label_name, 
                                value: body.value, 
                                odd: body.odd, 
                                event_date: body.event_date
                            }
                        ]
                    });
                    bet.save().then(doc => {
                        res.json({betToken: betToken, msg: "Your bet have been registered"});
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }
})

app.post("/slip", (req, res) => {
    let body = req.body;
    if(body.betToken) {
        BetModel.findOne({
            betID: body.betToken
        }).then(doc => {
            let data = {
                bets: doc.bets,
                identity: {
                    betID: doc.betID,
                    username: doc.username,
                    email: doc.email,
                    date: doc.currentDate,
                    payout: doc.payoutDate
                }
            }
            res.json(data);
        }).catch(err => console.log(err));
    } else {
        res.json({msg: "Your have no betslip yet"});
    }
})

app.post("/completed", (req, res) => {
    let body = req.body;
    if(body.token) {
        BetModel.findOne({
            betID: body.token
        }).then(doc => {
            doc.betStatus = "Completed"
            doc.save((err) => {
                if(err)
                    console.log(err)
                else {
                    res.json("ok");
                }
            })
        }).catch(err => console.log(err));
    }
})

//EndPoint
app.listen(3030, (err) => {
    if(!err)
        console.log("Connected to server at port 3030");
    else 
        console.log("Error connecting to server at port 3030");
})
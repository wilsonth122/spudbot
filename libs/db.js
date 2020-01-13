const {MongoClient} = require('mongodb');
const assert = require('assert');

// Load process.env values from .env file
require('dotenv').config();

let scoreboard = null;

const connect = () => {
    const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

    try {
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db("spudbot")
            scoreboard = db.collection("scoreboard")
        });
    } catch (e) {
        console.error(e);
    } 
}

const updateUserSpuds = async(user, spuds) => {
    try {
        let userEntry = await scoreboard.findOne({ _id: user })

        if(userEntry) {
            await scoreboard.updateOne({ _id: user }, {$set:{ score: userEntry.score + spuds }})
        }
        else {
            await scoreboard.insertOne({ _id: user, score: spuds })
        }
    } catch (e) {
        console.error(e);
    }
}

const getAllSpuds = async() => {
    try {
        return scoreboard.find({}).toArray()
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    connect,
    updateUserSpuds,
    getAllSpuds
}
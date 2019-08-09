const axios = require("axios");
const fs = require("fs");

console.log("this is loaded");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}

exports.omdb = {
    key: process.env.OMDB_KEY
}

exports.concerts = {
    id: "codingbootcamp"
}
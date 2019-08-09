// obtaining the required files
require("dotenv").config();
let axios = require("axios");
const keys = require("./keys");

// setting variaables for the key in this file
const spotify = keys.spotify;
const omdb = keys.omdb;
const concerts = keys.concerts;



function songSearch() {
    let search = process.argv.slice(3).join("%20");

    let queryURL = "https://api.spotify.com/v1/search?q=" + search + "&type=track,album,artist"

    axios.get({
        url: queryURL,
        headers: {
            client_id: spotify.id,
            client_secret: spotify.secret
        }
    }).then(function (response) {
        console.log(JSON.stringify(response))
    });
}





switch (process.argv[2]) {
    case "spotify":
    case "spotify-this":
    case "search-Song":
        songSearch();
        break;
}

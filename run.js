// obtaining the required files
require("dotenv").config();
let axios = require("axios");
const keys = require("./keys");

// setting variaables for the key in this file
const spotify = keys.spotify;
const omdb = keys.omdb;
const concerts = keys.concerts;



function songSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "https://api.spotify.com/v1/search?q=" + search + "&type=track,album,artist";

    axios.get({
        url: queryURL,
        headers: {
            client_id: spotify.id,
            client_secret: spotify.secret
        }
    }).then(function (response) {
        console.log(JSON.stringify(response, null, 2))
    }).catch(function (err) {
        console.log(err);
    });
};

function concertSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + concerts.id;
    
    axios.get(
        queryURL
    ).then(function (response) {

        let concert = response.data;

        for (i = 0; i <concert.length; i ++) {
            console.log("\n" + concert[i].datetime
            + "\n" + concert[i].venue.name + " in " + concert[i].venue.city + ", " + concert[i].venue.region
            + "\n" + concert[i].lineup.join(", "));
        };

    }).catch(function (err) {
        console.log(err);
    });
};

function movieSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdb.key;

    axios.get(queryURL).then(function (response) {
        console.log("\nthe movie was released in " + response.data.Released);
        console.log("has a rating of " + response.data.imdbRating);
        console.log("the plot is: ");
        console.log(response.data.Plot);
    }).catch(function (err) {
        console.log(err);
    });
}

switch (process.argv[2]) {
    case "spotify":
    case "spotify-this":
    case "search-Song":
        songSearch();
        break;
    case "concerts":
    case "concert-this":
    case "bandsintown":
        concertSearch();
        break;
    case "omdb":
    case "movie":
    case "search-movie":
        movieSearch();
        break;
};

// obtaining the required files
require("dotenv").config();
let axios = require("axios");
const keys = require("./keys");
let Spotify = require("node-spotify-api");

// setting variaables for the key in this file
const spotikeys = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
const omdb = keys.omdb;
const concerts = keys.concerts;



function songSearch() {

    let search = process.argv.slice(3).join(" ");

    spotikeys.search({
        type: "track",
        query: search,
        limit: 10
    }).then(function (response) {
        let results = response.tracks.items;

        for (i = 0; i < results.length; i++) {
            
            console.log("\nName of song: " + results[i].name);

            let creators = [];

            for (a = 0; a < results[i].artists.length; a++) {
                creators.push(results[i].artists[a].name);
            }

            console.log("\nBy " + creators.join(",  "));
            console.log("\ngive it a listen with \n" + results[i].external_urls.spotify);

            console.log("\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n");

        };

    }).catch(function (err) {
        console.log(err);
    })

};

function concertSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + concerts.id;

    axios.get(
        queryURL
    ).then(function (response) {

        let concert = response.data;

        for (i = 0; i < concert.length; i++) {
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

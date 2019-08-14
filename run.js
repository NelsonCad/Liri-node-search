// obtaining the required files
require("dotenv").config();
let axios = require("axios");
const keys = require("./keys");
let Spotify = require("node-spotify-api");

// setting variables for the key in this file
const spotikeys = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
const omdb = keys.omdb;
const concerts = keys.concerts;


// function to search spotify for a song 
function songSearch() {
    // doesn't matter how long the song name is
    let search = process.argv.slice(3).join(" ");

    // actually searches for the song
    spotikeys.search({
        type: "track",
        query: search,
        limit: 10 // limit to 10 per search
    }).then(function (response) {
        // this path is set to results
        let results = response.tracks.items;
        //for each item returned...
        for (i = 0; i < results.length; i++) {
            // console log the name
            console.log("\nName of song: " + results[i].name);

            let creators = [];
            // grab all atrists of the song if there are multiple artists
            for (a = 0; a < results[i].artists.length; a++) {
                creators.push(results[i].artists[a].name);
            }

            // console log the requested information
            console.log("\nBy " + creators.join(",  "));
            console.log("\ngive it a listen with \n" + results[i].external_urls.spotify);
            // add break for easier reading
            console.log("\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n");

        };

    }).catch(function (err) {
        console.log(err);
    });
};

// the function to search for concerts of an artist
function concertSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + concerts.id;
    // actual request for the concerts
    axios.get(
        queryURL
    ).then(function (response) {

        let concert = response.data;
        // for every concert returned, console log the requested information
        for (i = 0; i < concert.length; i++) {
            console.log("\n" + concert[i].datetime // couldn't figure out how to use moment to make the time easier to read
                + "\n" + concert[i].venue.name + " in " + concert[i].venue.city + ", " + concert[i].venue.region
                + "\n" + concert[i].lineup.join(", "));
        };

    }).catch(function (err) {
        console.log(err);
    });
};

// if a movie is requested to be searched
function movieSearch() {
    let search = process.argv.splice(3).join("%20");

    let queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdb.key;

    // actual request for the movie information
    axios.get(queryURL).then(function (response) {
        console.log("\nthe movie was released in " + response.data.Released);
        console.log("has a rating of " + response.data.imdbRating);
        console.log("the plot is: ");
        console.log(response.data.Plot);
        // only one item is returned, so no need for a break
    }).catch(function (err) {
        console.log(err);
    });
}

// switch statement to determine what to search
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
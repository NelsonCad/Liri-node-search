// obtaining the required files
require("dotenv").config();
let axios = require("axios");
const keys = require("./keys");

// setting variaables for the key in this file
const spotify = new spotify(keys.spotify);
const omdb = new omdb(keys.omdb);
const concerts = new concerts(keys.concerts);



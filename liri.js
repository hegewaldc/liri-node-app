var request = require('request');
var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twit = require('twit');
var Spotify = require('node-spotify-api');
var imdb = require('imdb-api');

var action = process.argv[2];

switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movieFunction();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}

function tweet(){

  var T = new Twit(twitterKeys);
  
  var params = {
    count: 20,
    screen_name: ''
  };

    T.get('statuses/user_timeline', params , function(err, data) {
      for (var i = 0; i < data.length ; i++) {
      console.log('Tweet: ' + data[i].text);
        console.log('Tweet created at: ' + data[i].created_at);
      }
  });
};


    function spotify() {
        
       var spotify = new Spotify({
         id: '102d288e13734766b30efb0caf0c7eb9',
         secret: 'c15786f446024e2a9c8e606ba002781b'
       });

       var nodeArg = process.argv;
       var queryArray = [];
       
       for (var i = 3; i < nodeArg.length; i++) {
          queryArray.push(nodeArg[i]);      
        } 
       spotify.search({ type: 'track', query: queryArray, limit: 1 }, function(err, data) {
        if (err) {
          spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function(data) {            
          console.log('Artist: ' + data.album.artists[0].name);         
          console.log('Song Name: ' + data.name);       
          console.log("Preview Link of Song: " + data.preview_url);      
          console.log("Album Name: " + data.album.name);      
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });
         }

        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log("Preview Link of Song: " + data.tracks.items[0].preview_url);    
        console.log("Album Name: " + data.tracks.items[0].album.name);
      
       });
    };

function movieFunction() {
 var nodeArg = process.argv;
 var queryArray = [];

  for (var i = 3; i < nodeArg.length; i++) {
     queryArray.push(nodeArg[i]); 
     var concatArray = (queryArray.join(' '));     
   };
   imdb.get(concatArray, {apiKey: '40e9cece', timeout: 30000}).then(function (data, err) {
    console.log('Movie Title: ' + data.title);
    console.log('Year: ' + data.year); 
    console.log('IMDB Rating: ' + data.ratings[0].Value);   
    console.log('Country: ' + data.country);
    console.log('Language: ' + data.languages);
    console.log('Movie Plot: ' + data.plot);
    console.log('Actors: ' + data.actors); 
   })
  .catch(function(err) {
    imdb.get('Mr. Nobody', {apiKey: '40e9cece', timeout: 30000}).then(function (data, err) {
      console.log('Movie Title: ' + data.title);
      console.log('Year: ' + data.year); 
      console.log('IMDB Rating: ' + data.ratings[0].Value);
      console.log('Country: ' + data.country);
      console.log('Language: ' + data.languages);
      console.log('Movie Plot: ' + data.plot);
      console.log('Actors: ' + data.actors);
    console.error('Error occurred: ' + err); 
  });
   
    });

  };
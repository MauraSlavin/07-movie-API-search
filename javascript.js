// the tastedive api key is 348815-07musicA-UK0GNRNO
// the omdb api key thats not trilogy is bdc51342

// ajax to the tastedive api
// The cors-anywhere-heroku thing is a work-around for cors errors

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=space+jam&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (responce) {
    console.log(responce);
    for (var i = 0; i < 3; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // Creates a button
        var x = $("<button>");
        // Adds a class of movie-btn to the button
        x.addClass("movie-btn");
        // Adding a data-attribute
        x.attr("data-name", responce.Similar.Results[i].Name);
        // Button text
        x.text([responce.Similar.Results[i].Name]);
        // Appending the button to the page
        $("#space_jam-similar").append(x);
      }
});

// This is for the nyt movie review api

$.ajax({
    url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=space+jam&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});

// // This is for omdb

$.ajax({
    url: "https://www.omdbapi.com/?t=space+jam&y=&plot=short&apikey=trilogy",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});
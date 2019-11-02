// data needed for each movie
var title = "";
var poster = "";
var year = "";
var director = "";
var rating = "";
var similarMovies = [];
var review = "";
var metaSource = "";
var metaRating = "";


// array of "movie" objects, to hold all the movies searched (including default) & related data
var movies = [];

// variable to receive user's input - a string that should be a movie title
var inputMovie = "";

// the tastedive api key is 348815-07musicA-UK0GNRNO
// the omdb api key thats not trilogy is bdc51342

// ajax to the tastedive api
// The cors-anywhere-heroku thing is a work-around for cors errors

// Alice: added instance var from Materialize
var elems = document.querySelector('.first-movie'); // grabbing initial movie dropdown
var firstCard = M.Collapsible.init(elems);
firstCard.open(); // intial movie dropdown opens


$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=space+jam&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (response) {
    console.log(response);
    for (var i = 0; i < 3; i++) {
        console.log("yeehaw")
        // Then dynamicaly generating buttons for each movie in the array
        // Creates a button
        var x = $("<button>");
        // Adds a class of movie-btn to the button
        x.addClass("movie-btn");
        // Adding a data-attribute
        x.attr("data-name", response.Similar.Results[i].Name);
        // Button text
        x.text([response.Similar.Results[i].Name]);
        // Appending the button to the page
        $("#space_jam-similar").append(x);
    }
});

// This is for the nyt movie review api

$.ajax({
    url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=space+jam&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
    method: "GET"
}).then(function (response) {
    console.log(response);
    var x = $("<a></a>");
    x.text([response.results[0].link.suggested_link_text]);
    x.attr("href", response.results[0].link.url);
    $("#space_jam-review").append(x);
});

// // This is for omdb

$.ajax({
    url: "https://www.omdbapi.com/?t=space+jam&y=&plot=short&apikey=trilogy",
    method: "GET"
}).then(function (response) {
    console.log(response);
    var x = $("<p></p>");
    console.log(response.Plot);
    x.text([response.Plot]);
    $("#space_jam-plot").append(x);
});

$("#search-button").on("click", function (event) {
    event.preventDefault();


    firstCard.close(); // initial open movie closes 

    inputMovie = $(".movie-input").val();   // get the movie the user entered


    // get information on the movie the user entered
    $.ajax({
        url: `https://www.omdbapi.com/?t=${inputMovie}&y=&plot=short&apikey=trilogy`,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // build new card for movie searched
        var newCard = $(".collapsible");
        var liEl = $('<li></li>');  //New li for each movie//
        // card header is the title
        var titleEl = $(`<div class="collapsible-header titleEl"><i class="material-icons">arrow_drop_down_circle</i>${response.Title}</div>`);
        // card body has the rest of the info
        var listBody = $('<div class="collapsible-body">');
        // new row has the poster, year, director & MPAA rating
        var newRow = $('<div class="row"></div>');

// put the poster, year, director, rating in the respective new elements
        var posterEl = $(`<div class="col s8 m8 l8 posterEl"><img src=${response.Poster} alt="poster image"></div>`);
        var yearEl = $(`<div class="center-align"><p>Year:  ${response.Year}</p></div>`);
        var dirEl = $(`<div class="center-align"><p>Director:  ${response.Director}</p></div>`);
        var ratgEl = $(`<div class="center-align"><p>MPAA Rating:  ${response.Rated}</p></div>`);
        var yearEtcEl = $(`<div class="col s4 m4 l4 yearEtcEl"></div>`)
        
        // add the year, director, rating to the div to the right of the poster
        $(yearEtcEl).append(yearEl).append(dirEl).append(ratgEl);


        // add the poster to the new row that will be in the body
        // actual poster data still needs to be set
        $(newRow).append(posterEl);

        // add Year, Director, Rating to newrow block
        $(newRow).append(yearEtcEl);

        // add newrow to the body of the card
        $(listBody).append(newRow);

        // put header & body on the li before appending to the ul
        $(liEl).append(titleEl); // adds a header to the li
        $(liEl).append(listBody);  // adds a body to the li after the header
        $(newCard).prepend(liEl)
        $("#card-container").prepend(newCard);
    });

    $.ajax({
        url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputMovie}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`, //nyt api request
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${inputMovie}&k=348815-07musicA-UK0GNRNO`, // Taste dive api request
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });


    var newCard = $(".collapsible");
    var liEl = $('<li></li>');  //New li for each movie//
    var titleEl = $(`<div class="collapsible-header titleEl"><i class="material-icons">arrow_drop_down_circle</i>${title}</div>`);
    var listBody = $('<div class="collapsible-body">');
    var newRow = $('<div class="row"></div>');

    var posterEl = $(`<div class="col s8 m8 l8 posterEl"><img src=${poster} alt="poster image"></div>`);
    var textYearDirRat = `Year:  ${year};  Director:  ${director};  Rating:  ${rating}`
    var yearEtcEl= $(`<div class="col s4 m4 l4 yearEtcEl">${textYearDirRat}</div>`)

    
    // add the poster to the new row that will be in the body
    // actual poster data still needs to be set
    $(newRow).append(posterEl);

    // add Year, Director, Rating to newrow block
    $(newRow).append(yearEtcEl);

    // add newrow to the body
    $(listBody).append(newRow);

    // put header & body on the li before appending to the ul
    $(liEl).append(titleEl); // adds a header to the li
    $(liEl).append(listBody);  // adds a body to the li after the header
    $(newCard).prepend(liEl)
    $("#card-container").prepend(newCard);

    var elem = document.querySelector('.collapsible'); // grabbing new movie dropdown
    var newMovie = M.Collapsible.init(elem);
    newMovie.open(); // new movie dropdown opens 

});
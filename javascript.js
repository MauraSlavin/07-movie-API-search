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
        console.log("yeehaw - query to tastedive done!!")
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
    x.attr("target", "_target");   // to open review in a new tab
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
    }).then(function (responseOMDB) {
        console.log(responseOMDB);
        // put this query nested in the OMDB response so the elements we're appending to exist when we expect them to.
        // query NYTimes for links to reviews of similar movies
        $.ajax({
            url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputMovie}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`, //nyt api request
            method: "GET"
        }).then(function (responseNYT) {
            console.log("OMDB response:");
            console.log(responseNYT);
            console.log("");  // leave a space so it's clear what the object in the console is

            // build new card for movie searched
            var newCard = $(".collapsible");
            var liEl = $('<li></li>');  //New li for each movie//
            // card header is the title
            var titleEl = $(`<div class="collapsible-header titleEl"><i class="material-icons">arrow_drop_down_circle</i>${responseOMDB.Title}</div>`);
            // card body has the rest of the info
            var listBody = $('<div class="collapsible-body">');
            // new row has the poster, year, director, MPAA rating, stars
            var newRow = $('<div class="row"></div>');

            // put the poster, year, director, rating in the respective new elements
            var posterEl = $(`<div class="col s8 m8 l8 posterEl"><img src=${responseOMDB.Poster} alt="poster image"></div>`);
            var yearEl = $(`<div class="movieDetail"><p>Year:  ${responseOMDB.Year}</p></div>`);
            var dirEl = $(`<div class="movieDetail"><p>Director:  ${responseOMDB.Director}</p></div>`);
            var ratgEl = $(`<div class="movieDetail"><p>MPAA Rating:  ${responseOMDB.Rated}</p></div>`);
            var starsEl = $(`<div class="movieDetail"><p>Stars:  ${responseOMDB.Actors}</p></div>`);
            var yearEtcEl = $(`<div class="col s4 m4 l4 yearEtcEl"></div>`)

            // add the year, director, rating to the div to the right of the poster
            $(yearEtcEl).append(yearEl).append(dirEl).append(ratgEl).append(starsEl);


            // add the poster to the new row that will be in the body
            // actual poster data still needs to be set
            $(newRow).append(posterEl);

            // add Year, Director, Rating to newrow block
            $(newRow).append(yearEtcEl);

            // add newrow to the body of the card
            $(listBody).append(newRow);

            // add plot under the poster & other info
            var plotEl = $(`<div class="row center-align s12 m12 l12"><p>${responseOMDB.Plot}</p></div>`);
            plotEl.addClass("center-align s12 m12 l12");
            $(listBody).append(plotEl);

            // add NY Times review under the plot
            var reviewEldiv = $("<div class='row center-align s12 m12 l12'>");
            var reviewEla = $("<a></a>");
            reviewEla.text([responseNYT.results[0].link.suggested_link_text]);
            reviewEla.attr("href", responseNYT.results[0].link.url);
            reviewEla.attr("target", "_blank");   // to open in a new tab
            $(reviewEldiv).append(reviewEla);
            $(listBody).append(reviewEldiv);
            
            // put header & body on the li before appending to the ul
            $(liEl).append(titleEl); // adds a header to the li
            $(liEl).append(listBody);  // adds a body to the li after the header
            $(newCard).prepend(liEl)
            $("#card-container").prepend(newCard);
            // Add new movie to the top of the list of searched movies
            
            
            // Put in query to make sure it's defined before using
            //     $("#card-container").prepend(newCard);
            
            // This has to go in .then block so it doesn't re-open the old first movie before the new one is prepended
            var elem = document.querySelector('.collapsible'); // grabbing new movie dropdown
            var newMovie = M.Collapsible.init(elem);
            newMovie.open(); // new movie dropdown opens 

        });   // end of ajax query to OMDB for movie searched
    });   // end of ajax query to NYTimes for review links



    // query TasteDive for list of similar movies to the one searched.
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${inputMovie}&k=348815-07musicA-UK0GNRNO`, // Taste dive api request
        method: "GET"
    }).then(function (responseTD) {
        console.log(responseTD);
    });   // end of ajax query to TasteDive for similar movies


});
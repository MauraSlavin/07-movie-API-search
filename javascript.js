// variable to receive user's input - a string that should be a movie title
var inputMovie = "";

// variable for the number of simliar moview to display (so it's easy to change)
var numSimilarMovies = 3;

// the tastedive api key is 348815-07musicA-UK0GNRNO
// the omdb api key thats not trilogy is bdc51342

// ajax to the tastedive api
// The cors-anywhere-heroku thing is a work-around for cors errors

// Alice: added instance var from Materialize
var elems = document.querySelector('.first-movie'); // grabbing initial movie dropdown
var firstCard = M.Collapsible.init(elems);
firstCard.open(); // intial movie dropdown opens


/* Query for similar movies for default movie */
$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=space+jam&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (response) {
    console.log(response);
    for (var i = 0; i < numSimilarMovies; i++) {
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
    }; // end of for each similar movie
});

// This is for the nyt movie review api for the default movie

$.ajax({
    url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=space+jam&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
    method: "GET"
}).then(function (response) {
    console.log(response);
    // add an "a" element with the link to the NY Times review
    var x = $("<a></a>");
    x.text([response.results[0].link.suggested_link_text]);
    x.attr("href", response.results[0].link.url);
    x.attr("target", "_target");   // to open review in a new tab
    $("#space_jam-review").append(x);
});

// This is for omdb for the default movie

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


// when the submit button is clicked to search for a new movie...
$("#search-button").on("click", function (event) {
    event.preventDefault();
    firstCard.close(); // initial open movie closes 
    inputMovie = $(".movie-input").val();   // get the movie the user entered


    // get information from OMDB on the movie the user entered; need this first
    $.ajax({
        url: `https://www.omdbapi.com/?t=${inputMovie}&y=&plot=short&apikey=trilogy`,
        method: "GET"
    }).then(function (responseOMDB) {
        console.log("OMDB:");
        console.log(responseOMDB);
        console.log(" "); // space between objects for clarity

        // get the TasteDive started since it can take a while
        //    this is a search for list of similar movies to the one searched.
        // this has to be in the .then for the other searches, so that the elements 
        // being appended to exist before we append them.
        $.ajax({
            url: `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${inputMovie}&k=348815-07musicA-UK0GNRNO`, // Taste dive api request
            method: "GET"
        }).then(function (responseTD) {
            // put this query nested in the OMDB response so the elements we're appending to exist when we expect them to.
            // query NYTimes for links to reviews of similar movies
            console.log("TasteDive:");
            console.log(responseTD);
            console.log(" "); // space between objects for clarity

            $.ajax({
                url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputMovie}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`, //nyt api request
                method: "GET"
            }).then(function (responseNYT) {
                console.log("NTY response:");
                console.log(responseNYT);
                console.log("");  // leave a space so it's clear what the object in the console is
                console.log("Now have all data needed from APIs");

                // build new card for movie searched
                var newCard = $(".collapsible");
                var liEl = $('<li></li>');  //New li for each movie//
                // card header is the title
                var titleEl = $(`<div class="collapsible-header titleEl"><i class="material-icons">arrow_drop_down_circle</i>${responseOMDB.Title}</div>`);
                // card body has the rest of the info
                var listBody = $('<div class="collapsible-body">');
                // new row has the poster, year, director, MPAA rating, stars
                var newRow = $('<div class="row"></div>');

                // build row for  poster, year, director, rating, & stars in the respective new elements
                var posterEl = $(`<div class="col s8 m8 l8 posterEl"><img src=${responseOMDB.Poster} alt="poster image"></div>`);
                // build new ul with li's for year, director, rating, & stars in the respective new elements
                //     ... to go to the right of the poster
                var yearEtcEl = $('<div class="col s4 m4 l4 yearEtcEl"></div>');  // div ROW for year, dir, rating, starts
                var newDetailsUl = $('<ul class="row"></ul>');          // UL for year, dir, rating, stars
                var yearLiEl = $(`<li class="collection-item movie-det-li">Year:  ${responseOMDB.Year}</li>`);  // year
                var dirLiEl = $(`<li class="collection-item movie-det-li">Director:  ${responseOMDB.Director}</li>`);  // director
                var ratgLiEl = $(`<li class="collection-item movie-det-li">MPAA Rating:  ${responseOMDB.Rated}</li>`);  // rating
                var starsLiEl = $(`<li class="collection-item movie-det-li">Stars:  ${responseOMDB.Actors}</li>`);  // stars

                // add the year, director, rating, & stars to the ul to the right of the poster
                $(newDetailsUl).append(yearLiEl).append(dirLiEl).append(ratgLiEl).append(starsLiEl);
                // then add the ul to the small column div (to go to the right of the poster)
                $(yearEtcEl).append(newDetailsUl);


                // add the poster to the new row that will be in the body
                // actual poster data still needs to be set
                $(newRow).append(posterEl);

                // add Year, Director, Rating, Stars to newrow block
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

                // Add other similar movie suggestions to page
                // create the div
                var similarMovieDivEl = $("<div>");
                similarMovieDivEl.addClass("row center-align s12 m12 l12");
                // add each of the movies to the div
                for (var i = 0; i < numSimilarMovies; i++) {
                    // Then dynamicaly generating buttons for each movie in the array
                    // Creates a button
                    var similarMovieButtonEl = $("<button>");
                    // Adds a class of movie-btn to the button
                    similarMovieButtonEl.addClass("movie-btn");
                    // Adding a data-attribute
                    similarMovieButtonEl.attr("data-name", responseTD.Similar.Results[i].Name);
                    // Button text
                    similarMovieButtonEl.text([responseTD.Similar.Results[i].Name]);
                    // Appending the button to the div that holds all the suggestions
                    similarMovieDivEl.append(similarMovieButtonEl);
                }; // end of for each similar movie

                // add all the suggestions (the DIV) to the page
                $(listBody).append(similarMovieDivEl);

                // put header & body on the li before appending to the ul
                $(liEl).append(titleEl); // adds a header to the li
                $(liEl).append(listBody);  // adds a body to the li after the header
                $(newCard).prepend(liEl)
                $("#card-container").prepend(newCard);
                // Add new movie to the top of the list of searched movies



                // This has to go in .then block so it doesn't re-open the old first movie before the new one is prepended
                var elem = document.querySelector('.collapsible'); // grabbing new movie dropdown
                var newMovie = M.Collapsible.init(elem);
                newMovie.open(); // new movie dropdown opens 

            });   // end of ajax query to OMDB for movie searched
        });   // end of ajax query to NYTimes for review links
    });  // end of ajax query to TasteDive


});
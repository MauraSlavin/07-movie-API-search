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





// This is for the movie db to get the default movie

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie?page=1&api_key=92dce995d85e4765ae2474cf460816b6",
    method: "GET"
}).then(function (responseTMDB) {
    var defaultTitle = responseTMDB.results[0].original_title;
    $("#default").append(defaultTitle);

    /* Query for similar movies for default movie */
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${defaultTitle}&k=348815-07musicA-UK0GNRNO`,
        method: "GET"
    }).then(function (responseTD) {

        // Creates a button
        var buttonDivEl = $("<button>");
        // Adds a class of movie-btn to the button
        buttonDivEl.addClass("movie-btn");

        // maxMovies is the number of movies we've decided to show, or the max number of similar movies returned (if less)
        var maxMovies = numSimilarMovies;   // assume at least the number we want to show is available
        var numResults = responseTD.Similar.Results;  // get the similar movies returned
        var numResults = numResults.length;           // get the number of similar movies returned
        if (numResults == 0) {                   // if no similar movies returned, set button with message saying so
            // Adding a data-attribute  
            buttonDivEl.attr("data-name", "no movies to suggest");
            // Button text
            buttonDivEl.text(["no movies to suggest"]);
        }
        else {                                 // at a button for each movie returned, up to the number we've decided to show
            numResults = Math.min(length.numResults, numSimilarMovies);   // reduce numResults to a max of the number we want to show
            for (var i = 0; i < numResults; i++) {     // add a button for each of the movies we want to show
                // Then dynamicaly generating buttons for each movie in the array
                // Adding a data-attribute  
                buttonDivEl.attr("data-name", responseTD.Similar.Results[i].Name);
                // Button text
                buttonDivEl.text([responseTD.Similar.Results[i].Name]);

            }; // end of for each similar movie
        };
        // Appending the button to the page
        $("#default-similar").append(buttonDivEl);



        // This is for the nyt movie review api for the default movie
        $.ajax({
            url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${defaultTitle}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`,
            method: "GET"
        }).then(function (responseNYT) {

            // add a hyperlink element with the link to the NY Times review
            var hyperlinkEl = $("<a></a>");
            hyperlinkEl.text([responseNYT.results[0].link.suggested_link_text]);
            hyperlinkEl.attr("href", responseNYT.results[0].link.url);
            hyperlinkEl.attr("target", "_target");   // to open review in a new tab
            $("#default-review").append(hyperlinkEl);
        });  // end of ajax call to NYTimes for default movie reviews


    }); // end of ajax call to tastedive for default movie

    // This is for omdb for the default movie

    $.ajax({
        url: `https://www.omdbapi.com/?t=${defaultTitle}&y=&plot=short&apikey=trilogy`,
        method: "GET"
    }).then(function (responseOMDB) {
        // Update all the details on the page with the data retrieved from the ajax call
        var paragraphEl = $("<p></p>");
        console.log(responseOMDB.Plot);
        paragraphEl.text([responseOMDB.Plot]);
        $("#default-plot").append(paragraphEl);
        $("#defaultPoster").attr("src", responseOMDB.Poster);
        $("#defaultYear").text(`Year:  ${responseOMDB.Year}`);
        $("#defaultDir").text(`Director:  ${responseOMDB.Director}`);
        $("#defaultMPAA").text(`MPAA Rating:  ${responseOMDB.Rated}`);
        $("#defaultStars").text(`Stars:  ${responseOMDB.Actors}`);
    });  // end of ajax call to omdb for default movie

});  // end of ajax call to themoviedb for popular movie



// when the submit button is clicked to search for a new movie...
$("#search-button").on("click", function (event) {
    event.preventDefault();
    firstCard.close(); // initial open movie closes 
    inputMovie = $(".movie-input").val();   // get the movie the user entered

    // Turn on progress bar
    $(".container").css("display", "block");
    $(".progressDiv1").addClass("progress");
    $(".progressDiv2").addClass("indeterminate");

    // get information from OMDB on the movie the user entered; need this first
    $.ajax({
        url: `https://www.omdbapi.com/?t=${inputMovie}&y=&plot=short&apikey=trilogy`,
        method: "GET"
    }).then(function (responseOMDB) {

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

            $.ajax({
                url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${inputMovie}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`, //nyt api request
                method: "GET"
            }).then(function (responseNYT) {

                // turn off progress bar
                $(".progressDiv1").removeClass("progress");
                $(".progressDiv2").removeClass("indeterminate");
                $(".container").css("display", "none");

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
                var posterEl = $(`<div class="col s8 m8 l8 posterEl"><img src=${responseOMDB.Poster} alt="poster image" width="100%"></div>`);
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
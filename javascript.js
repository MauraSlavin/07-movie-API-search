// variable to receive user's input - a string that should be a movie title
var inputMovie = "";

// variable for the number of simliar moview to display (so it's easy to change)
var numSimilarMovies = 5;
var movieName = "";  // Keep track of what is in the input field
// the tastedive api key is 348815-07musicA-UK0GNRNO
// the omdb api key thats not trilogy is bdc51342

// ajax to the tastedive api
// The cors-anywhere-heroku thing is a work-around for cors errors

// Alice: added instance var from Materialize
var elems = document.querySelector('.first-movie'); // grabbing initial movie dropdown
var firstCard = M.Collapsible.init(elems);
firstCard.open(); // intial movie dropdown open

function searchMovie(movie) {

    // Turn on progress bar
    $(".container").css("display", "block");
    $(".progressDiv1").addClass("progress");
    $(".progressDiv2").addClass("indeterminate");

    // get information from OMDB on the movie the user entered; need this first
    $.ajax({
        url: `https://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=bdc51342`,
        method: "GET",
        success: function (responseOMDB) {
            console.log("OMDB response");  // Maura
            console.log(responseOMDB);  // Maura

            // if movie not found, put error message in input field
            if (responseOMDB.Response == "False") {   // it's a string, not a boolean
                $(".movie-input").val(`Sorry, ${movie} not found.`);        // put error message in input field
                // turn off progress bar
                $(".progressDiv1").removeClass("progress");
                $(".progressDiv2").removeClass("indeterminate");
                $(".container").css("display", "none");
            }
            else {
                // get the TasteDive started since it can take a while
                //    this is a search for list of similar movies to the one searched.
                // this has to be in the .then for the other searches, so that the elements 
                // being appended to exist before we append them.
                $.ajax({
                    url: `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${movie}&t=movies&k=348815-07musicA-UK0GNRNO`, // Taste dive api request
                    method: "GET",
                    type: "POST",
                    success: function (responseTD) {
                        console.log("TD response");  // Maura
                        console.log(responseTD);  // Maura
                        // put this query nested in the OMDB response so the elements we're appending to exist when we expect them to.
                        // query NYTimes for links to reviews of similar movies
                        var movieLocal = movie.toLowerCase();   // so I can access it after the ajax call; will compare lowercase to api in lowercase
                        movieLocal = movieLocal.replace(/[\W_]/g, "");  // remove all non-alphanumerics to make comparison more friendly
                        $.ajax({
                            url: `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movie}&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM`, //nyt api request
                            method: "GET"
                        }).then(function (responseNYT) {
                            console.log("NYT response");  // Maura
                            console.log(responseNYT);  // Maura
                            console.log("Num results: " + responseNYT.num_results);

                            // turn off progress bar
                            $(".progressDiv1").removeClass("progress");
                            $(".progressDiv2").removeClass("indeterminate");
                            $(".container").css("display", "none");

                            // build new card for movie searched
                            var newCard = $(".collapsible");
                            var liEl = $('<li class="new-movie"></li>');  //New li for each movie//
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

                            switch (responseOMDB.Ratings.length) {
                                case 0:  // if length of string is null, there were no ratings
                                    var tomatoesLiEl = $(`<li class="collection-item movie-det-li">(No rating found.)</li>`); // no rating found
                                    break;

                                case 1:  // if length of Ratings is 1, just grab it
                                    var tomatoesLiEl = $(`<li class="collection-item movie-det-li">${responseOMDB.Ratings[0].Source}:  ${responseOMDB.Ratings[0].Value}</li>`);
                                    break;

                                default:  // otherwise grab the second, which seems to be Rotten Tomatoes. Use their verbage, in case it's different
                                    var tomatoesLiEl = $(`<li class="collection-item movie-det-li">${responseOMDB.Ratings[1].Source}:  ${responseOMDB.Ratings[1].Value}</li>`); // rotten tomatoes
                                    break;
                            };  // of getting the right ratings (switch statement)

                            // add the year, director, rating, stars, & rotten tomatoes to the ul to the right of the poster
                            $(newDetailsUl).append(yearLiEl).append(dirLiEl).append(ratgLiEl).append(starsLiEl).append(tomatoesLiEl);
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

                            // if no reviews, display message saying so
                            if (responseNYT.num_results == 0) {
                                var reviewEla = $("<p>No NY Times reviews were found for this movie.</p>");
                            }  // of if no reviews found
                            // if review, display clickable link
                            else {
                                var reviewLink = "";
                                var reviewText = "";
                                // make sure movie review name matches - NYTimes doesn't always give exact match
                                for (var i = 0; i < responseNYT.num_results; i++) {
                                    // find a match
                                    var checkTitle = responseNYT.results[i].display_title.toLowerCase();  // make api title lowercase...
                                    checkTitle = checkTitle.replace(/[\W_]/g, "");  // ... and remove non-alphanumerics before comparison
                                    if (movieLocal == checkTitle) {   // found one!
                                        reviewLink = responseNYT.results[i].link.url;
                                        reviewText = responseNYT.results[i].link.suggested_link_text;
                                        i = responseNYT.num_results;  // to force for loop to exit
                                    };  // end of if movieLocal = a title in the NYT response
                                };  // end of checking for each response in the NYTimes result
                                // if no matches in results from NYTimes, display message saying so
                                if (reviewLink == "") {
                                    var reviewEla = $("<p>No NY Times reviews were found for this movie.</p>");
                                }  // of if no review titles matched
                                else {  // else there was a match!  A review for THIS movie  was found.
                                    var reviewEla = $("<a></a>");
                                    reviewEla.text([reviewText]);
                                    reviewEla.attr("href", reviewLink);
                                    reviewEla.attr("target", "_blank");   // to open in a new tab
                                };  // of else - a match was found!
                            };  // of else if reviews were found
                            // append review message or link
                            $(reviewEldiv).append(reviewEla);
                            $(listBody).append(reviewEldiv);

                            // Add other similar movie suggestions to page
                            // create the div
                            var message;
                            var similarMovieDivEl = $("<div>");
                            similarMovieDivEl.addClass("row center-align s12 m12 l12");

                            var movies = [];
                            var numMovies = 1;
                            var noMovies;

                            // are there suggestions?  if length is 0, then no
                            if (responseTD.Similar.Results.length == 0) {  // no suggestions
                                movies.push("");
                                numMovies = 1;
                                noMovies = true;
                            }
                            else {  // there are suggestions!
                                numMovies = responseTD.Similar.Results.length;
                                noMovies = false;
                                for (var i = 0; i < numMovies; i++) {
                                    movies.push(responseTD.Similar.Results[i].Name);
                                }
                            };

                            var getNumMovies = Math.min(numMovies, numSimilarMovies);
                            // add each of the movies to the div
                            for (var i = 0; i < getNumMovies; i++) {
                                $.ajax({
                                    method: "GET",
                                    url: `https://www.omdbapi.com/?t=${movies[i]}&y=&plot=short&apikey=bdc51342`,
                                    success: function (response2, status) {
                                        console.log("OMDB:");
                                        console.log(response2);
                                        console.log("OMDB.Response:  " + response2.Response);
                                        console.log("status:  " + status);

                                        if (noMovies) {
                                            message = 'There are no movie suggestions for this movie.';

                                            var similarImgDiv = $(`<p>${message}</p>`);
                                            similarMovieDivEl.append(similarImgDiv);
                                        }
                                        else {
                                            // poster found
                                            var similarImgDiv = $("<img>");
                                            similarImgDiv.addClass("movie-btn");
                                            similarImgDiv.attr("src", response2.Poster);
                                            similarImgDiv.attr("alt", response2.title);
                                            similarImgDiv.attr("data-name", response2.Title);
                                            similarMovieDivEl.append(similarImgDiv);
                                        };
                                    },  // of success on omdb query for similar movie posters
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        if (noMovies) {
                                            message = 'There are no movie suggestions for this movie.';
                                        }
                                        else {
                                            message = `No poster found for ${responseTD.Similar.Results[i].Name}.`
                                        };
                                        var similarImgDiv = $(`<p>${message}</p>`);
                                        similarMovieDivEl.append(similarImgDiv);

                                    },

                                    // display message & clickable paragraph if no poster was found.
                                    fail: function (response2) {
                                        if (noMovies) {
                                            message = 'There are no movie suggestions for this movie.';
                                        }
                                        else {
                                            message = `No poster found for ${responseTD.Similar.Results[i].Name}.`
                                        };
                                        var similarImgDiv = $(`<p>${message}</p>`);
;
                                        similarImgDiv.addClass("movie-btn");
                                        similarImgDiv.attr("data-name", response2.Title);
                                        similarMovieDivEl.append(similarImgDiv);
                                    }  // of fail on omdb query for similar movie posters
                                });  // of ajax call to omdb for similar movie posters

                                // var similarImgDiv = $("<img>");
                                // similarImgDiv.addClass("movie-btn");
                                // similarImgDiv.attr("src", responseOMDB.Poster);
                                // similarImgDiv.attr("alt", responseOMDB.title);
                                // similarImgDiv.attr("data-name", responseTD.Similar.Results[i].Name);
                                // similarMovieDivEl.append(similarImgDiv);
                            }; // end of for each similar movie
                            var similarMovieMsgEl = $("<p>Here are some suggestions for movies you might like...</p>");
                            similarMovieDivEl.prepend(similarMovieMsgEl);

                            // add all the suggestions (the DIV) to the page
                            $(listBody).append(similarMovieDivEl);

                            // put header & body on the li before appending to the ul
                            $(liEl).append(titleEl); // adds a header to the li
                            $(liEl).append(listBody);  // adds a body to the li after the header
                            $(newCard).prepend(liEl)
                            $("#card-container").prepend(newCard);
                            // Add new movie to the top of the list of searched movies

                            // This has to go in .then block so it doesn't re-open the old first movie before the new one is prepended

                            firstCard.close(); // initial open movie closes 
                            var elem = document.querySelector('.collapsible'); // grabbing new movie dropdown
                            var newMovie = M.Collapsible.init(elem);
                            newMovie.open();

                        });   // end of ajax query to NY times for movie review
                    },  // of successful ajax call to tastedive for titles of similar movies

                    fail: function (responseTD) {
                        //   **** what to do if TD query failed.
                        var message = "Query for similar movies failed."
                        var similarImgDiv = $(`<p>${message}</p>`);
                        similarMovieDivEl.append(similarImgDiv);
                    }  // of failed ajax call to tastedive for titles of similar movies
                });  // end of ajax call to tastedive for titles of similar movies
            };  // end of if movie not found in OMDB call
        }, // end of success call to omdb for movie details
        //        error: function(XMLHttpRequest, textStatus, errorThrown) {
        //            alert("some error");
        //         }
        //        },
        fail: function (responseOMDB) {
            $(".movie-input").val(`Sorry, ${movie} not found.`);        // put error message in input field
            movie = "";
        }  // end of failed call to omdb for movie details

    });  // end of ajax query to OMDB for details on movie searched

};   // of searchMovie function


// This is for the movie db to get the default movie

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie?page=1&api_key=92dce995d85e4765ae2474cf460816b6",
    method: "GET"
}).then(function (responseTMDB) {
    console.log("TMDB response");  // Maura
    console.log(responseTMDB);  // Maura
    var defaultTitle = responseTMDB.results[0].original_title;
    $("#default").val(defaultTitle);

    searchMovie(defaultTitle);
    // code here in notepad (Maura)
    movieName = '';  // make sure movie name is empty
    $("#search-button").removeClass("hover-class");  // and search icon not highlighted when hovered

});  // end of ajax call to themoviedb for popular movie



// when submit button is clicked to search for a new movie...
$("#search-button").on("click", function (event) {
    event.preventDefault();
    inputMovie = $(".movie-input").val();   // get the movie the user entered
    searchMovie(inputMovie);
    movieName = '';
    $(".movie-input").val("");   // clear the input field
    $("#search-button").removeClass("hover-class");
});


// remove char from movie string if backspace entered
$('html').keyup(function (event) {
    if (event.keyCode == 8) {
        movieName = movieName.substring(0, movieName.length - 1);
        // add hover highlighting if movieName no longer empty
        if (movieName.length == 1) {
            $("#search-button").addClass("hover-class");
        }
        // remove hover highlighting if movieName becomes empty
        else if (movieName.length == 0) {
            $("#search-button").removeClass("hover-class");
        };
    };
});


// when enter hit in input field, search for a new movie...
// if keypress is triggered, but enter not pressed, add new character to movie name, and display new string on the page
$(".input-field").keypress(function (event) {
    event.preventDefault();

    // get code for key entered
    var code = event.keyCode || event.which;

    // 13 is code for enter
    if (code == 13) {
        searchMovie(movieName);    // do the search
        movieName = '';            // pre for new movie name
        // field cleared, so the search icon should no longer be highlighted when hovered.
        $("#search-button").removeClass("hover-class");  // in case there was already a hover-class there; don't want there to be two! (or it won't go away when you expect it to)
    }
    else {                      // character was entered (most likely!)
        // fromCharCode converts the key code to the character entered
        movieName = movieName + String.fromCharCode(event.which);   // append new character to movie name
        $("#search-button").removeClass("hover-class");  // in case there was already a hover-class there; don't want there to be two! (or it won't go away when you expect it to)
        // add hover highlighting, since there is something in that field.
        $("#search-button").addClass("hover-class");
    };

    // display either the partial movie name (if not done) or a blank string (if movie searched)
    $(".movie-input").val(movieName);

});


$(document).on("click", ".movie-btn", (event) => { // A click event on the whole document that only triggers if it also hits something with the class movie-btn
    console.log(event.currentTarget);
    movieName = $(event.currentTarget).attr("data-name"); // setting a variable to the data-name of the clicked button
    $(".movie-input").val(movieName); // setting the value of the movie input to the similar movie title
    $(".movie-input").focus();
    // delete the hover-class first, in case there's already one there.  Then add one.
    //   if we end up with 2 hover-class's, there might still be one there when we remove it.
    $("#search-button").removeClass("hover-class");
    $("#search-button").addClass("hover-class");


    // taken from https://stackoverflow.com/questions/15935318/smooth-scroll-to-top

    const scrollToTop = () => { //declaring the arrow function
        const c = document.documentElement.scrollTop || document.body.scrollTop; //set c to equal to the number of pixels scrolled past the top. the or statement if for cross browser compatibility
        if (c > 0) { // starting an if statement where the condition is whether or not youve scrolled below the top
            window.requestAnimationFrame(scrollToTop); // This is a recursive callback where we stitch together what the function does to give it a smooth look.
            window.scrollTo(0, c - c / 8); // here we set where we are scrolling to (in this case the top of the page). the second parameter is the speed of the scroll. the reason we do this is because we dont want the scroll to take forever if youre really deep into the page.
        }
    };
    scrollToTop();
});

// one of these for each movie searched (and first movie loaded)
var movie = {
    title: "",
    poster: "",
    year: "",
    director: "",
    rating: "",
    similarMovies: [],
    review: "",
    metaSource: "",
    metaRating: ""
};

// array of "movie" objects, to hold all the movies searched (including default) & related data
var movies = [];

// variable to receive user's input - a string that should be a movie title
var inputMovie = "";

// the tastedive api key is 348815-07musicA-UK0GNRNO
// the omdb api key thats not trilogy is bdc51342

// ajax to the tastedive api
// The cors-anywhere-heroku thing is a work-around for cors errors

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=Aladdin&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (response) {
    console.log(response)
});

// This is for the nyt movie review api

$.ajax({
     url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=batman&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
     method: "GET"
}).then(function(response){
     console.log(response);
});

// // This is for omdb

$.ajax({
    url: "https://www.omdbapi.com/?t=space+jam&y=&plot=short&apikey=trilogy",
    method: "GET"
}).then(function (response) {
    // Retrieve data needed from "response".
    movie.title = response.Title;
    movie.poster = response.Poster;
    movie.year = response.Year;
    movie.director = response.Director;
    movie.rating = response.Rated;
    movie.metaSource = response.Ratings[1].Source;
    movie.metaRating = response.Ratings[1].Value;
    movie.stars = response.Actors;

    // for testing only
    console.log(response);
    console.log("Title: " + movie.title);
    console.log("Poster:  " + movie.poster);
    console.log("Year:  " + movie.year);
    console.log("Director: " + movie.director);
    console.log("Rating: " + movie.rating);
    console.log("Rating source:  " + movie.metaSource);
    console.log("Rating (meta): " + movie.metaRating);
    console.log("Stars:  " + movie.stars);
});

$("#search-button").on("click", function(event){
    event.preventDefault();
    alert("hello");

    // Maura:  This adds the elements in the new ul, but doesn't display it on the page, yet

    // Maura: Are we adding a whole new list every time someone searches a movie?
    //      I thought we were adding an li?
    var newCard = $('<ul class="collapsible cardEl"></ul>');
    var liEl = $('<li class="active"></li>');  //Maura added active to display on the page
    var titleEl = $(`<div class="collapsible-header titleEl"><i class="material-icons">arrow_drop_down_circle</i>${movie.title}</div>`);
    var listBody = $('<div class="collapsible-body">');
    var newRow = $('<div class="row"></div>');
    var posterEl = $('<div class="col s8 posterEl"></div>');
    var textYearDirRat = `Year:  ${movie.year};  Director:  ${movie.director};  Rating:  ${movie.rating}`
    var yearEtcEl= $(`<div class="col s12 yearEtcEl">${textYearDirRat}</div>`)
    
    // add the poster to the new row that will be in the body
    // actual poster data still needs to be set
    $(newRow).append(posterEl);
    
    // add Year, Director, Rating to newrow block
    $(newRow).append(yearEtcEl);

    // add newrow to the body
    $(listBody).append(newRow);

    // put header & body on the li before appending to the ul
    $(liEl).append(titleEl);  // adds a header to the li
    $(liEl).append(listBody);  // adds a body to the li after the header
    $(newCard).append(liEl);  // newCard is ul; this adds an li to the ul


    // adds new ul at the end of the document
    $(document.body).append(newCard);  // Maura: do this last?  Build card first, then append it?
});
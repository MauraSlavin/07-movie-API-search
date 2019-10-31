// the tastedive api key is 348815-07musicA-UK0GNRNO


// ajax to the tastedive api

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=Aladdin&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (responce) {
    console.log(responce)
});


//////////////////////////////////////////////////////////////////////////////////////////////////

// movie memes



// This is for the nyt movie review api

$.ajax({
    url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=batman&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});

// // This is for omdb

$.ajax({
    url: "https://www.omdbapi.com/?t=lebowski&apikey=bdc51342",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});
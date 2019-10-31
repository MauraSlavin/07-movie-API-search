// the musixmatch api key is 2e226514eac6539c3e3fde46c74f0129
// the tastedive api key is 348815-07musicA-UK0GNRNO

// ajax to the musixmatch api

// $.ajax({
//     method: "GET",
//     url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433",
//     Header: {
//         "Access-Control-Allow-Origin":"*",
//     }
//     }).then(function(responce){
//         console.log(responce);
//     });


// ajax to the tastedive api

// $.ajax({
//     url: "https://tastedive.com/api/similar?q=Black+Sabbath&k=348815-07musicA-UK0GNRNO",
//     method: "GET"
// }).then(function(responce){
//     console.log(responce)
// });


//////////////////////////////////////////////////////////////////////////////////////////////////

// movie memes



// This is for the nyt movie review api

$.ajax({
    url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=lebowski&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});

// This is for omdb

$.ajax({
    url: "https://www.omdbapi.com/?t=lebowski&apikey=bdc51342",
    method: "GET"
}).then(function(responce){
    console.log(responce);
});
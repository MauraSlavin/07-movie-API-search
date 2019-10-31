// the musixmatch api key is 2e226514eac6539c3e3fde46c74f0129
// the tastedive api key is 348815-07musicA-UK0GNRNO

// ajax to the musixmatch api

function getLyrics() {

    var artistSearch = "Billy Joel";
    $.ajax({
        type: "GET",
        data: {
            apikey: "2e226514eac6539c3e3fde46c74f0129",
            q_artist: artistSearch,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};


getLyrics();


//The totality of the was taken from https://codepen.io/brian_jenney/pen/dGKmyX
// I have no idea whats going on


// ajax to the tastedive api

$.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=Black+Sabbath&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function (responce) {
    console.log(responce)
});


//////////////////////////////////////////////////////////////////////////////////////////////////

// movie memes



// This is for the nyt movie review api

// $.ajax({
//     url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=lebowski&api-key=zZrGvMTHO8rZYgmqMozo6nBXMVSdTemM",
//     method: "GET"
// }).then(function(responce){
//     console.log(responce);
// });

// // This is for omdb

// $.ajax({
//     url: "https://www.omdbapi.com/?t=lebowski&apikey=bdc51342",
//     method: "GET"
// }).then(function(responce){
//     console.log(responce);
// });
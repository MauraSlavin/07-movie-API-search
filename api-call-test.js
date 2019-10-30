// the musixmatch api key is 2e226514eac6539c3e3fde46c74f0129
// the tastedive api key is 348815-07musicA-UK0GNRNO

// ajax to the musixmatch api
// $.ajax({
//     method: "GET",
//     url: "http://tracking.musixmatch.com/t1.0/2e226514eac6539c3e3fde46c74f0129/?artist_name=katy%20perry%20&track_name=hot%20n%20cold",
//     }).then(function(responce){
//         console.log(responce);
//     });


// ajax to the tastedive api
$.ajax({
    url: "https://tastedive.com/api/similar?q=Black+Sabbath&k=348815-07musicA-UK0GNRNO",
    method: "GET"
}).then(function(responce){
    console.log(responce)
});
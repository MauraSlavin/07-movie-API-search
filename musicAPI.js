// Lyrics can be in a string, with "\\n" to start a new line
var lyrics = "Love, love love\nLove, love love\nLove, love love\nTheres nothing you can do that cant be done\nNothing that you can sing that can't be sung\nNothing you can say, but you can learn how to play the game\nIts easy\ntheres nothing that you can make that cant be made\nNo one you can save that can' be saved\nNothing you can do, but you can learn how to be you in time\nIt's easy\nAll you need is love\nAll you need is love\nAll you need is love, love is all you need\n(love love love)\n(love love love)\n(love love love)\nAll you need is love\nAll you need is love\nAll you need is love, love Love is all you need\nTheres nothing you can know that isnt known\nNothing you cant see that isnt shown\ntheres nowwhere you can be that isnt where your meant to be\nIts easy\nAll you need is love\nAll you need is love\nAll you need is love, love\nLove is all you need\nAll you need is love\n(All together now)\nAll you need is love. (everybody)\nAll you need is love, love\nlove is all you need(X about 20 times)";

// Each song the user enters will end up with a number (I've done 3 here) of similar songs.
// For testing purposes, I've put them in an object, with the entered song as the key.

// I've assumed the user has entered 5 songs, so we have 5 songlists (0 - 4)
var songList0 = {
    "My Life": ["All You Need is Love", "Song 3", "Song 4"]
};

var songList1 = {
    Royals: ["Song 2", "Song 3", "Song 4"]
};

var songList2 = {
    "You're Welcome": ["Song 2", "Song 3", "Song 4"]
};

var songList3 = {
    "Screen Door on a Submarine": ["Song 2", "Song 3", "Song 4"]
};


var songList4 = {
    "The Monster Mash": ["Song 2", "Song 3", "Song 4"]
};

var songLists = {
    songs: [songList1, songList2, songList3]
};

console.log("songList1:  " + songList1);
console.log("songList2:  " + songList2);
console.log("songLists:  " + songLists);

//Put in local storage
localStorage.setItem("songs", JSON.stringify(songLists));


// This doesn't do anything yet.  I'm not sure why. 
$(".dropdown-button").dropdown(function (event) {
    console.log(lyrics);
  //  window.open("./lyrics.html", "_self");  // go to highScores page (starts javascript from beginning)

});

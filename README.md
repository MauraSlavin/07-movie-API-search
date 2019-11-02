# 07-music-API-search
A music API search
yeehaw, partner!


A default movie is loaded on the home page when the user first loads the site.

The user can enter a movie name.  Then movie information is displayed for that movie, 
and a list of movies similar to that is loaded after the information about the original movie.

When one of the similar movies is clicked, that title is displayed in the search box, 
and the page is moved to the top (if it had scrolled down).

When the user then clicks the text box, the movie information is replaced with the similar movie the user has chosen.

On further iterations, movies searched are appended to the end of the page (with most recent searches on top), 
in a collapsible list.  When a movie name is uncollapsed, the movie information is displayed under the movie name in the list at the bottom of the page (in its current location in the list of searched movies).

The movie information displayed is:
- Title
- Poster
- Year released
- Director's name
- Rating
- NY Times review
- Meta-rating
  


## Class names
* .movieInputEl - div for input or textarea for user to enter movie name being searched
* .cardEl - div containing the movie title (under the input field) through the list of similar movies
* .titleEl - div for movie title
* .posterEl - div containing the image of the movie poster
* .yearEtcEl - div for row with year, director & rating (G, PG, etc.)
* .starsEl - div for list of stars
* .reviewEl - div for NY Times review
* .ratingEl - div for meta-rating
* .similarMoviesUlEl - div for unordered list of similar movies
* .similarMoviesLiEl - div for list item



## Variable names
movie = {

    title:      // string - title name 
    
    poster:     // string - url to image
    
    year:       // string - year released
    
    director:   // string - name of director
    
    rating:     // string - rating (G, PG, R, etc.)
    
    similarMovies:  // array of strings - ["movie title 1", "movie title 2", ...]
    
    review:     // string - text of the review
    
    metaRating: // ??
    
}

movies = [movie1, movie2, ...]  // array of movie objects

inputMovie                      // string - name of movie that user input

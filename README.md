# 07-movie-API-search    
Deployed app: [Finding Films](https://mauraslavin.github.io/07-movie-API-search/)

Github pages: [GitHub pages](https://github.com/MauraSlavin/07-movie-API-search)

## Finding Films

This app finds movies similar to ones you already enjoy, to help you find a new movie to watch that you'll love!

- Find movies you’re guaranteed to love!
- Based on what you already adore.
- Fantastically easy to search for new movies.
- Stars! Ratings! Reviews! And more!  Quickly and easily available.
- Lots of pictures!

## Technologies and tools used:

- The following api's are used:
  - omdbapi.com for year, director, MPAA rating, stars, rotten tomatoes rating, poster, plot
  - api.nytimes.com for NY Times reviews
  - tastedive.com for suggested movies
  - api.themoviedb.org for the default movie
- Materialize CSS
- Javascript
- jQuery
- html
- css
- fontawesome


## Using Finding Movies
The page loads with the most popular movie from "The Movie Database" API.

Displayed are the movie poster, and these details about the movie to the right of the poster:
    - Year released;
    - Director;
    - MPAA rating;
    - Stars;
    - Rotten Tomatoes rating.

The plot, a link to a NY Times review, and posters of suggested similar movies are displayed next.

![Finding Films](/Assets/Images/screenshot.png)

The user can search a new movie in two ways:
1.  clicking on a recommended poster
        (which puts the movie name in the search field), then click on the search icon or hit enter; or
2.  entering a new movie name, and clicking the search icon or hitting enter.

The new movie is loaded the same as the first movie, with the first movie existing as collapsed element at the bottom of the page.

This process can be repeated as often as desired, with newly searched movies appending to the top of the page.

It is responsive to different screen sizes.

The following errors are caught and communicated to the user:
- No movie found
- No Rotten Tomatoes rating found (another pulled, or message saying none found if there are none)
- No movie poster found
- No other movie suggestions found


Let us help you find a movie you know you'll enjoy!

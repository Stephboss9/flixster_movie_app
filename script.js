//global selectors
const movieDisplay = document.querySelector("#movie_section")
const showMoreBtn = document.querySelector(".button")
const movieInputField = document.querySelector("#Mname")
const movieForm = document.querySelector("#search_area")
const imageLink = "https://image.tmdb.org/t/p/w780"
const searchBtnElem = document.querySelector('#search_button')
const upToTopBtn = document.querySelector('.back_up_btn')
const api_key = "d475181c2b1a55789d8ab274062dbc3b"
const movieSectionElem = document.querySelector('#movie_section')
const bodyElem = document.querySelector('body')
const wholeDoc = document.querySelector('html')
const clearElem = document.querySelector('.clear_icon')
const closeBtn = document.querySelector('.close_btn')
const popUp = document.querySelector('.movie_info_modal')

//other variables
let nowPlayingPage = 1
let prevNowPlayingPage = 0
let searchPage = 1
let prevPage = 1
let movieTitle = ""
let vote = 0
let playingApiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=`
let searchApiUrl = ''
let searchMoreFromInput = false
let searchTerm = ""

getResults(playingApiUrl, nowPlayingPage)

movieForm.addEventListener('submit', (event) => {
    //reset search page
    searchPage = 1
    event.preventDefault()
    searchMoreFromInput = true
    /*get search term*/
    searchTerm = movieForm['Mname'].value
    if (searchTerm === ''){
        searchMoreFromInput = false

        for(let i = 1; i <= nowPlayingPage;i++){
            getResults(playingApiUrl, i)
        }
    }
    
    movieDisplay.innerHTML = ``
    searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&include_adult=false&query=${searchTerm}&page=`
    getResults(searchApiUrl, searchPage)})


/*takes care of clearing search results */
    movieInputField.addEventListener('click', () => {
        /*show the clear button icon */
    clearElem.classList.remove('hidden')
    /**when user clicks clear button, clear input field and show previous now playing movies */
    })
    clearElem.addEventListener('click', ()=> {
        /*go back to page 1 of the now playing page*/ 
    /** set the search term to empty*/
    movieForm['Mname'].value = ''
    /**hide the clear element button */
    clearElem.classList.add('hidden')
    movieDisplay.innerHTML = ``
    searchMoreFromInput = false
    
    /**display previous movies that were displayed */
    for(let i = 1; i <= nowPlayingPage;i++){
        getResults(playingApiUrl, i)
    }
    })
    

async function getResults(url, currentPage){

    let response = await fetch(url+currentPage)
   
    let responseData = await response.json()

    displayResults(responseData)
}

function displayResults(movies) {
  
    movies.results.map(movie => {     
        movieDisplay.innerHTML += `
        <div class = "movie_poster reveal" onclick = "generateMovieInfo(${movie.id})"> 
        <img class = "movie_poster_img" alt = "movie poster image" src = "https://image.tmdb.org/t/p/w342${movie.poster_path}"> 
        <p class = "rating"><img class = "rating_icon" src = "star_icon.png"> ${movie.vote_average}</p>
        <p class = "movie_title">${movie.title}<p>
        </div>`
    });
    
    showMoreBtn.classList.remove('hidden')
    upToTopBtn.classList.remove('hidden')
}



function loadMoreMovies(){
    if (searchMoreFromInput === true){
        searchPage += 1
        getResults(searchApiUrl, searchPage)
    } else {
        nowPlayingPage += 1
        getResults(playingApiUrl, nowPlayingPage)
    }

}

/*generates more info about each movie*/ 
async function generateMovieInfo(movieId) {
    //api url for movie info, and movie videos
    let movieInfo = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
    let movieVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`
    //make api call for videos and info
    let videoRequest = await fetch(movieVideo)
    let videoData = await videoRequest.json()
    console.log(videoData.results[0].key)

    /**get info about the movie */
    let response = await fetch(movieInfo)
    let info = await response.json()
    const movieInfoSection = document.querySelector('.movie_modal_content')
    /**show popup */
    popUp.classList.remove('hidden')
    //update popup with info about the movie
   // <iframe width="560" height="315" src="https://www.youtube.com/embed/FuiMQPc5aKA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        movieInfoSection.innerHTML += 
        `
        <div class = "movie_trailer">
            <iframe class = "video" width="600" height="390" src="https://www.youtube.com/embed/${videoData.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p><h1 class = "movie_title">${info.title}</h1></p>
        <div class = "side_info">${info.runtime} min | ${info.release_date} | ${info.original_language} | <img class = "rating_icon" src = "star_icon.png"> ${info.vote_average}</div>
        <div class = "movie_overview"> ${info.overview}</div>
        `
  
}
// closes the pop up area

function closePopUpArea() {
    const movieInfoSection = document.querySelector('.movie_modal_content')
    movieInfoSection.innerHTML = ''
    popUp.classList.add('hidden')
}

window.onload = function () {
    showMoreBtn.addEventListener('click', () => { loadMoreMovies()})
    /*
        setTimeout(() => {const imageElems = document.querySelectorAll('.movie_poster')
        imageElems.forEach(image => 
            image.addEventListener('click', () => {
            movieSectionElem.classList.add('low_opacity')    
            image.classList.add('low_opacity')
            image.innerHTML = '<div class="movie_description" >hey</div>'
    }))}, 100)

*/

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');


    for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}
  }

    




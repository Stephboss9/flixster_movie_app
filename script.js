//global selectors
const movieDisplay = document.querySelector("#movie_section")
const showMoreBtn = document.querySelector(".button")
const movieInputField = document.querySelector("#Mname")
const movieForm = document.querySelector("#search_bar")
const imageLink = "https://image.tmdb.org/t/p/w780"
const searchBtnElem = document.querySelector('#search_button')

const api_key = "d475181c2b1a55789d8ab274062dbc3b"

//other variables
let page = 1
let movieTitle = ""
let vote = 0
let playingApiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=`
let searchApiUrl = ''
let searchMoreFromInput = false
let searchTerm = ""

movieForm.addEventListener('submit', (event) => {
    page = 1
    event.preventDefault()
    searchMoreFromInput = true
    searchTerm = movieForm['Mname'].value
    console.log(searchTerm)
    movieDisplay.innerHTML = ``
    searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&include_adult=false&query=${searchTerm}&page=`
    getResults(searchApiUrl)})

async function getResults(url){
    console.log(url)

    let response = await fetch(url+page)
   
    let responseData = await response.json()
    console.log(responseData)

    displayResults(responseData)
}

function displayResults(movies) {
  
    movies.results.forEach(movie => {
        let movieImageSize = 'w342'
     
        movieDisplay.innerHTML += `
        <div class = "movie_poster"> 
        <img class = "movie_poster_img" src = "https://image.tmdb.org/t/p/w342${movie.poster_path}"> 
        <p class = "rating"><img class = "rating_icon" src = "star_icon.png"> ${movie.vote_average}</p>
        <p class = "movie_title">${movie.title}<p>
        </div>`
    });
    showMoreBtn.classList.remove('hidden')
 
}

function handleFormSub(evt, url) {
    showMoreBtn.classList.add('hidden')
    getResults(evt, url)
}

function loadMoreMovies(){
    page+=1
    if (searchMoreFromInput === true){
        getResults(searchApiUrl)
    } else {
        getResults(playingApiUrl)
    }

}

window.onload = function () {
    showMoreBtn.addEventListener('click', () => { loadMoreMovies()})
    getResults(playingApiUrl)
}




let movieList = document.querySelector('.movies');
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });

  const respDate = await resp.json();
  showMovies(respDate);
};

function showMovies(date) {
  console.log(date.films);
  date.films.forEach(film => {
    let movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<div class="movie">
                <div class="movie__cover--inner">
                    <img src="${film.posterUrl}" alt="${film.nameEn}" class="movie__cover">
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${film.nameRu ? film.nameRu:film.nameEn}</div>
                    <div class="movie__genre">${film.genres.map(genre => `${genre.genre}`)}</div>
                    <div class="rating ${color(film.rating)}">${film.rating}</div>
                </div>
            </div>`;
    movieList.appendChild(movieEl);
  });
}

function color(rate) {
  if (rate > 7) {
    return 'green';
  } else if (rate > 4) {
    return 'yellow';
  } else {
    return 'red';
  }
}

getMovies(API_URL_POPULAR);
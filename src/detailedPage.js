//tmdb api
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDE3MGZlMGJlM2UwZDE3NzkyMGE3MDQxZmQ1NGM4NiIsInN1YiI6IjY2MjVkYTMzMjIxYmE2MDE3YzE1NDQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRZNYVownPtQj6yIFrodZCqJZfvFyuPxHjF_kH8JMyI",
  },
};

// 영화 장르 ID 정보
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let movieList = data["results"];

    movieList.forEach((movie) => {
      console.log(movie);
      const pathId = window.location.search
        .match(/(?<==)[0-9.]+/g)
        .map(Number)[0];
      if (pathId === movie.id) {
        movieInfo(movie);
      }
    });
  })
  .catch((err) => console.error(err));

function movieInfo(movie) {
  const movieTitle = document.querySelector("h1");
  const releaseDate = document.querySelector(".release-date");
  const genre = document.querySelector(".genre");
  const content = document.querySelector("p");
  const image = document.querySelector(".movie-img");

  movieTitle.textContent = movie.title;
  releaseDate.textContent = movie.release_date;
  content.textContent = movie.overview;
  image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  // 영화 장르 ID 정보
  fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
    .then((response) => response.json())
    .then((genreInfo) => {
      genreInfo["genres"].forEach((el) => {
        if (el.id === movie.genre_ids[0]) {
          genre.textContent = el.name;
        }
      });
    })
    .catch((err) => console.error(err));
}

const reviewBtn = document.querySelector(".review");
reviewBtn.addEventListener("click", function () {
  window.scrollTo(0, 500);
});

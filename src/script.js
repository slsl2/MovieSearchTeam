import { searchMovie } from "./search.js";

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", topFix); //페이지 스크롤시 topFix() 실행

  let headerTop = document.getElementById("top");
  let active = headerTop.offsetTop; //headerTop의 offsetTop 위치 저장

  function topFix() {
    if (window.pageYOffset > active) {
      headerTop.classList.add("active");
      //console.log('sticky');
    } else {
      headerTop.classList.remove("active");
      //console.log('not sticky');
    }
  }
});
// title(제목),
// overview(내용 요약),
// poster_path(포스터 이미지 경로),
// vote_average(평점)
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

//tmdb api
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDE3MGZlMGJlM2UwZDE3NzkyMGE3MDQxZmQ1NGM4NiIsInN1YiI6IjY2MjVkYTMzMjIxYmE2MDE3YzE1NDQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRZNYVownPtQj6yIFrodZCqJZfvFyuPxHjF_kH8JMyI",
  },
};

let globalMovieData = []; // 전역 변수로 영화 데이터를 저장

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {

    globalMovieData = data["results"].sort(
      (a, b) => b.popularity - a.popularity // 디폴트 정렬 = 인기순
    ); // 데이터 저장
    displayMovies(globalMovieData); // 초기 영화 목록 표시
  })
  .catch((err) => console.error(err));

function displayMovies(movieList) {
  const cardList = document.getElementById("mycards");
  cardList.innerHTML = ""; // 기존 카드를 초기화
  movieList.forEach(addCard);
}

function addCard(movie) {
  let image = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  let title = movie.title;
  let overview = movie.overview;
  let vote = "★ " + movie.vote_average.toFixed(1); // 소수점 1자리수까지 노출
  let card = document.createElement("div");
  card.className = "col";

  card.innerHTML = `
    <div class="card">
        <img src=${image} class="card-img-top" alt="포스터">
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="card-text">${overview}</p>
            <p class="card-vote">${vote}</p>
        </div>
    </div>
    `;

  card.addEventListener("click", () => window.location.href = `detailed-page.html?id=${movie.id}`);
  mycards.append(card);
}


document.getElementById("sort-select").addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "sort-by-popularity":
      globalMovieData.sort((a, b) => b.popularity - a.popularity);
      break;
    case "sort-by-title":
      globalMovieData.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "sort-by-date":
      globalMovieData.sort((a, b) =>
        b.release_date.localeCompare(a.release_date)
      );
      break;
    case "sort-by-rating":
      globalMovieData.sort((a, b) => b.vote_average - a.vote_average);
      break;
  }
  displayMovies(globalMovieData);
});

searchMovie();

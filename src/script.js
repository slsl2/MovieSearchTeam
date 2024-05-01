
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', topFix); //페이지 스크롤시 topFix() 실행

    let headerTop = document.getElementById('top');
    let active = headerTop.offsetTop; //headerTop의 offsetTop 위치 저장

    function topFix() {
        if (window.pageYOffset > active) {
            headerTop.classList.add('active');
            //console.log('sticky');
        } else {
            headerTop.classList.remove('active');
            //console.log('not sticky');
        }
    };

});



// title(제목), 
// overview(내용 요약), 
// poster_path(포스터 이미지 경로), 
// vote_average(평점)
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg


//tmdb api
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDE3MGZlMGJlM2UwZDE3NzkyMGE3MDQxZmQ1NGM4NiIsInN1YiI6IjY2MjVkYTMzMjIxYmE2MDE3YzE1NDQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tRZNYVownPtQj6yIFrodZCqJZfvFyuPxHjF_kH8JMyI'
    }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    .then(response => response.json())
    .then((data) => {
        let movieList = data['results'];

        movieList.forEach(movie => {
            addCard(movie)
        });
    })
    .then(searchMovies)
    .catch((err) => console.error(err));



function addCard(movie) {
    let image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    let title = movie.title
    let overview = movie.overview;
    let vote = '★ ' + movie.vote_average.toFixed(1); // 소수점 1자리수까지 노출
    let card = document.createElement('div');
    card.className = 'col';

    card.innerHTML = 
    `
    <div class="card">
        <img src=${image} class="card-img-top" alt="포스터">
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="card-text">${overview}</p>
            <p class="card-vote">${vote}</p>
        </div>
    </div>
    `;

    card.addEventListener('click', () => alert(`영화 id : ${movie.id}`));
    mycards.append(card);

}



// 검색 기능
function searchMovies() {

    const mycards = document.querySelector('#mycards')
    const movieCard = mycards.querySelectorAll('.col');
    const searchInput = document.querySelector('#searchInput');
    const searchBtn = document.querySelector("#searchBtn");

    function searchHandle(e){
        e.preventDefault();
        let userInput = searchInput.value;

        movieCard.forEach((el) => {
            el.classList.remove('hidden');
            let movieTitle = el.getElementsByTagName('h2')[0].innerText;
            if (!movieTitle.toLowerCase().includes(userInput)) {
                el.classList.add("hidden");
            }
        })
    }
    searchBtn.addEventListener("click", searchHandle);
}
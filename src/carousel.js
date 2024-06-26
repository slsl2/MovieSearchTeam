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
fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1", options)
    .then((response) => response.json())
    .then((data) => {
        let movieList = data['results'];
        initSlider(movieList);
    });


function initSlider(movieList) {
    const wrapper = document.querySelector('.swiper-wrapper-banner')
    const prevBtn = document.querySelector(".swiper-button-prev");
    const nextBtn = document.querySelector(".swiper-button-next");

    movieList.forEach(a => {
        let slideimage = 'https://image.tmdb.org/t/p/w500' + a['poster_path'];
        let slidetitle = a['title'];
        let ogtitle = a['original_title'];
        let movieid = a['id'];

        const swiper_slide = document.createElement('div');
        swiper_slide.className = 'swiper-slide';
        const img = document.createElement('img');
        img.className = 'banner-img';

        const slide_txt = document.createElement('div');
        slide_txt.className = 'slide-txt';
        const titleEl = document.createElement('h1');
        titleEl.className = 'slide-title'
        const ogtitleEl = document.createElement('p');
        ogtitleEl.className = 'slide-en-title';
        slide_txt.append(titleEl, ogtitleEl);


        img.src = slideimage;
        titleEl.innerText = slidetitle;
        ogtitleEl.innerText = ogtitle;

        swiper_slide.append(img, slide_txt);

        swiper_slide.addEventListener("click", () => window.location.href = `detailed-page.html?id=${movieid}`);
        wrapper.append(swiper_slide);



        const slideCount = 20; //array(20)
        //슬라이드 0번째에 있는 컨텐츠의 크기를 확인 => 이미지 사이즈 : 1250px 
        const size = swiper_slide.clientWidth;

        //currentIndex = 1로 초기값 슬라이드[1]
        let currentIndex = 1;

        function updateSliderPosition() {
            wrapper.style.transform = `translateX(${-size * currentIndex}px)`;
        }


        function goToSlide(index) {
            wrapper.style.transition = "0.3s ease";

            //인덱스가 범위를 벗어 나는지 확인
            //노출되는 슬라이드
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            console.log(index);

            updateSliderPosition();

        }


        // 브라우저 크기가 조정될 때마다 트리거되는 이벤트 리스너, resize
        // 슬라이더의 위치가 다시 계산되고 새창 크기에 맞게 업데이트 되도록 하기위한 기능
        window.addEventListener("resize", function () {
        //슬라이드 너비 가져옴 offsetWidth(컨텐츠, 패팅, 테두리 등 요소의 너비)를 사용
        slideWidth = swiper_slide.offsetWidth;
        console.log(slideWidth);
        //업데이트 된 slideWidth 값을 확인하고 아래 함수를 호출해서 새너비를 기준으로 슬라이드 위치를 변경
        updateSliderPosition();
      });


        //슬라이드 무한루프
        wrapper.addEventListener("transitionend", () => {
            // currentIndex가 마지막일 인덱스일 경우
            if (currentIndex === slideCount - 1) {
                //첫번째 인덱스로 돌아감
                currentIndex = 1;
                wrapper.style.transition = "0s";
                wrapper.style.transform = `translateX(${-size * currentIndex}px)`;
            }

            // 첫번째 인덱스일 경우
            if (currentIndex === 0) {
                // 마지막 슬라이드 이전 슬라이드
                currentIndex = slideCount - 2;
                wrapper.style.transition = "0s";
                wrapper.style.transform = `translateX(${-size * currentIndex}px)`;

            }
        });

        updateSliderPosition();


        nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
        prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

    });

}



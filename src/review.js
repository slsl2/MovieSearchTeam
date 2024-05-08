
// 영화의 고유 식별자를 추출하는 함수
function extractIdFromUrl(url) {
  let queryString = url.split('?')[1];
  if (!queryString) return null;
  let params = queryString.split('&');
  for (let i = 0; i < params.length; i++) {
      let param = params[i].split('=');
      if (param[0] === 'id') {
          return param[1];
      }
  }
  return null;
}

// 리뷰 카드 생성 함수
function createReview(tagName, className, html = "") {
  let element = document.createElement(tagName);
  element.className = className;
  element.innerHTML = html;
  return element;
}

// 해당 영화와 관련된 리뷰만 필터링하여 렌더링하는 함수
function renderReviewsForMovie() {
  let reviewListWrap = document.getElementById('review-list-wrap');
  reviewListWrap.innerHTML = ""; 

  let url = window.location.href;
  let movieId = extractIdFromUrl(url);
  let reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];
  let filteredReviews = reviewData.filter(review => review.movieId === movieId);

  filteredReviews.forEach(function(data) {
      let newUl = createReview('ul', 'review-card');
      let newLi = createReview('li', 'review-li');
      let newDivTop = createReview('div', 'review-list-top');
      let newSpanAuthor = createReview('span', 'review-author', data.id);
      let newDivBottom = createReview('div', 'review-list-bottom');
      let newP = createReview('p', 'review-content', data.review);
      let newDivSettings = createReview('div', 'review-settings');
      let newDivButtons = createReview('div', 'review-buttons');
      let newUpdateBtn = createReview('button', 'update-btn', "수정");
      let newVerticalDiv = createReview('div', 'vertical-line');
      let newDeleteBtn = createReview('button', 'delete-btn', "삭제");

      newDivTop.appendChild(newSpanAuthor);
      newDivBottom.appendChild(newP);
      newDivBottom.appendChild(newDivSettings);
      newDivSettings.appendChild(newDivButtons);
      newDivButtons.appendChild(newUpdateBtn);
      newDivButtons.appendChild(newVerticalDiv);
      newDivButtons.appendChild(newDeleteBtn);

      newUl.appendChild(newLi);
      newLi.appendChild(newDivTop);
      newLi.appendChild(newDivBottom);
      reviewListWrap.appendChild(newUl);

      newUpdateBtn.addEventListener('click', function() {
          let password = prompt('비밀번호를 입력하세요');
          verifyPasswordAndEdit(data.id, password);
      });

      newDeleteBtn.addEventListener('click', function() {
          let password = prompt('비밀번호를 입력하세요');
          verifyPasswordAndDelete(data.id, password);
      });
  });
}

// 리뷰 추가 함수
function setReviewData(e) {
  e.preventDefault();
  let textId = document.getElementById('author').value;
  let textPassword = document.getElementById('password').value;
  let textReview = document.getElementById('review').value;
  let url = window.location.href;
  let movieId = extractIdFromUrl(url);

  if (textId === "" || textPassword === "" || textReview === "") {
      alert('모든 항목을 입력해주세요');
  } else {
      let reviewPlus = { movieId: movieId, id: textId, password: textPassword, review: textReview };
      let reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];
      reviewData.push(reviewPlus);
      localStorage.setItem('reviewData', JSON.stringify(reviewData));
      alert('저장완료');
      renderReviewsForMovie();
  }
    document.getElementById("author").value = "";
    document.getElementById("password").value = "";
    document.getElementById("review").value = "";
}

// 리뷰 삭제 함수
function verifyPasswordAndDelete(id, password) {
  let reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];
  let reviewToDeleteIndex = reviewData.findIndex(review => review.id === id);
  if (reviewToDeleteIndex !== -1 && password && password.trim() !== "" && password === reviewData[reviewToDeleteIndex].password) {
      let movieId = reviewData[reviewToDeleteIndex].movieId;
      reviewData.splice(reviewToDeleteIndex, 1);
      localStorage.setItem('reviewData', JSON.stringify(reviewData));
      alert('삭제완료');
      renderReviewsForMovie(movieId);
  } else {
      alert('비밀번호가 일치하지 않거나 해당 리뷰가 없습니다');
  }
}

// 리뷰 수정 함수
function verifyPasswordAndEdit(id, password) {
  let reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];
  let reviewToEditIndex = reviewData.findIndex(review => review.id === id); 
  if (reviewToEditIndex !== -1 && password && password.trim() !== "" && password === reviewData[reviewToEditIndex].password) {
      let newText = prompt('수정할 리뷰를 입력해주세요', reviewData[reviewToEditIndex].review);
      if (newText !== null) {
          reviewData[reviewToEditIndex].review = newText;
          localStorage.setItem('reviewData', JSON.stringify(reviewData));
          alert('수정완료');
          renderReviewsForMovie(reviewData[reviewToEditIndex].movieId);

      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  } else {

      alert('비밀번호가 일치하지 않거나 해당 리뷰가 없습니다');
  }
}
window.onload = function() {
  renderReviewsForMovie();
};


function createReview(tagName,className,html=""){
  let element = document.createElement(tagName);
  element.className = className;
  element.innerHTML = html;
  return element
}
let getData = JSON.parse(localStorage.getItem('reviewData'));
if(localStorage.getItem('reviewData')){
  getData.forEach(function(data,index){
      let newUl = createReview('ul','review-card');
      let newLi = createReview('li','review-li');
      newUl.appendChild(newLi)
      let newDiv = createReview('div','review-list-top');
      newLi.appendChild(newDiv);
      let newSpan = createReview('span','review-author',data.id);
      newDiv.appendChild(newSpan)
      let newBtnWrapDiv = createReview('div','review-list-bottom');
      newLi.appendChild(newBtnWrapDiv);
      let newP = createReview('p','review-content',data.review);
      newBtnWrapDiv.appendChild(newP)
      let newSetDiv = createReview('div','review-settings');
      newBtnWrapDiv.appendChild(newSetDiv)
      let newBtnDiv = createReview('div','review-buttons');
      newSetDiv.appendChild(newBtnDiv)
      let newUpDateBtn = createReview('button','update-btn',"수정");
      newBtnDiv.appendChild(newUpDateBtn)
      let newVerticalDiv = createReview('div','vertical-line');
      newBtnDiv.appendChild(newVerticalDiv)
      let newDeleteBtn = createReview('button','delete-btn',"삭제");
      newBtnDiv.appendChild(newDeleteBtn)

      newUpDateBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력해주세요')
          verifyPasswordAndEdit(index,password);
      })
      newDeleteBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력해주세요')
          verifyPasswordAndDelete(index,password);
      })
      document.getElementById('review-list-wrap').appendChild(newUl)
  })
} else {
  localStorage.setItem('reviewData', JSON.stringify([]))
}

function setReviewData() {
  let textId = document.getElementById('author').value;
  let textPassword = document.getElementById('password').value;
  let textReview = document.getElementById('review').value;
  if(textId === ""||textPassword === ""||textReview === ""){
      alert('모든 항목을 입력해주세요');
  } else {
      let newCard = createReview('div','review-card');
      let newSpan = createReview('span','card-id',textId);
      newCard.appendChild(newSpan);
      let newTextArea = createReview('textarea','card-review',textReview);
      newCard.appendChild(newTextArea);
      document.getElementById("review-list-wrap").appendChild(newCard);

      let reviewPlus = { id : textId, password : textPassword, review : textReview };
      let data = getData || [];
      data.push(reviewPlus);
      localStorage.setItem('reviewData', JSON.stringify(data));
      
      alert('저장완료');
      render();
  }
}
function render() {
  document.getElementById('review-list-wrap').innerHTML = "";
  let renderData = getData || [];
  renderData.forEach(function(data,index){
      let newUl = createReview('ul','review-card');
      let newLi = createReview('li','review-li');
      newUl.appendChild(newLi);
      let newDiv = createReview('div','review-list-top');
      newLi.appendChild(newDiv);
      let newSpanAuthor = createReview('span', 'review-author',data.id);
      newDiv.appendChild(newSpanAuthor);
      let newBtnWrapDiv = createReview('div', 'review-list-bottom');
      newLi.appendChild(newBtnWrapDiv);
      let newP = createReview('p','review-content',data.review);
      newBtnWrapDiv.appendChild(newP);
      let newSetDiv = createReview('div','review-settings');
      newBtnWrapDiv.appendChild(newSetDiv);
      let newBtnDiv = createReview('div', 'review-buttons');
      newSetDiv.appendChild(newBtnDiv);
      let newUpDateBtn = createReview('button','update-btn',"수정");
      newBtnDiv.appendChild(newUpDateBtn);
      let newVerticalDiv = createReview('div','vertical-line');
      newBtnDiv.appendChild(newVerticalDiv);
      let newDeleteBtn = createReview('button','delete-btn','삭제');
      newBtnDiv.appendChild(newDeleteBtn);

      newUpDateBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력하세요')
          verifyPasswordAndEdit(index, password);
      })
      newDeleteBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력하세요')
          verifyPasswordAndDelete(index, password);
      })
      document.getElementById('review-list-wrap').appendChild(newUl);
  })
}
function verifyPasswordAndDelete(index, password) {
  if(password !== null && password.trim() !== ""){
      if(password === getData[index].password){
          getData.splice(index,1)
          localStorage.setItem('reviewData', JSON.stringify(getData));
          alert('삭제완료')
          render()
      } else{
          alert('비밀번호가 일치하지 않습니다')
      }
  } else {
      alert('비밀번호가 일치하지 않습니다')
  }
}
function verifyPasswordAndEdit(index, password) {
  if(password !== null && password.trim() !== ""){
      if(password === getData[index].password){
          let newText = prompt('수정할 리뷰를 입력해주세요', getData[index].review);
          if(newText !== null) {
              getData[index].review = newText;
              localStorage.setItem('reviewData', JSON.stringify(getData));
              alert('수정완료')
              render()
          }
      } else {
          alert('비밀번호가 일치하지 않습니다')
      }
  } else {
      alert('비밀번호가 일치하지 않습니다')
  }
}
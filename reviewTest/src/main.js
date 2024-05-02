if (localStorage.getItem("defaultData")) {

}else{
    localStorage.setItem("defaultData", JSON.stringify([]))
}

if (localStorage.getItem("reviewData")) {
  let getData = JSON.parse(localStorage.getItem("reviewData"));
  // 매개변수로 data, index를 받아옴
  getData.forEach(function(data,index) {
    let storageCard = document.createElement("div");
    storageCard.className = "review-card";
  
    const newH5 = document.createElement("h5");
    newH5.className = "card-id";
    newH5.innerText = data.id;
    storageCard.appendChild(newH5);
  
    const newP = document.createElement("p");
    newP.className = "card-review";
    newP.innerText = data.review;
    storageCard.appendChild(newP);

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "삭제"
    deleteButton.className = 'delete-button'
    deleteButton.addEventListener('click',function(){
      let password = prompt('비밀번호를 입력하세요');
      verifyPasswordAndDelete(index,password);
    })
    storageCard.appendChild(deleteButton)

    // 수정 버튼 생성
    const editButton = document.createElement("button");
    editButton.innerHTML = "수정"
    editButton.className = 'edit-button'
    editButton.addEventListener('click',function(){
      let password = prompt('비밀번호를 입력하세요');
      verifyPasswordAndEdit(index,password);
    })
    storageCard.appendChild(editButton)

    document.getElementById("review-plate").appendChild(storageCard);
  });
}else{
    localStorage.setItem("reviewData", JSON.stringify([]))
}

let getData = JSON.parse(localStorage.getItem("reviewData"));


function setReviewData() {

  let textId = document.getElementById("id-text").value;
  let textPassword = document.getElementById("password-text").value;
  let textReview = document.getElementById("review-text").value;
  // input에 빈 값이 있을경우 경고메세지 띄움
  if(textId === "" || textPassword === "" || textReview === ""){
    alert('모든 항목을 입력해주세요')
  } else {
      //가져온 내용을 카드로 작성
  
      let newCard = document.createElement("div");
      newCard.className = "review-card";
  
      const newH5 = document.createElement("h5");
      newH5.className = "card-id";
      newH5.innerText = textId;
  
      newCard.appendChild(newH5);
  
      const newP = document.createElement("p");
      newP.className = "card-review";
      newP.innerText = textReview;
  
      newCard.appendChild(newP);
  
      document.getElementById("review-plate").appendChild(newCard);
    
    // 가져온 내용을 스토리지에 저장하기
    let reviewPlus = { id: textId, password: textPassword, review: textReview };
    let getData = JSON.parse(localStorage.getItem("reviewData"));
    getData.push(reviewPlus);
    localStorage.setItem("reviewData", JSON.stringify(getData));
    
    alert("저장완료");
    render()
  }
}
// 데이터 삭제
function verifyPasswordAndDelete(index, password) {
  let getData = JSON.parse(localStorage.getItem("reviewData"));
  if (password !== null && password.trim() !== "") {
      if (password === getData[index].password) {
          getData.splice(index, 1);
          localStorage.setItem("reviewData", JSON.stringify(getData));
          alert('삭제완료')
          render();
      } else {
          alert('비밀번호가 일치하지 않습니다');
      }
  } else {
      alert('비밀번호를 입력해주세요');
  }
}
// 렌더링
function render() {
  document.getElementById("review-plate").innerHTML = "";
  let getData = JSON.parse(localStorage.getItem("reviewData")) || [];
  getData.forEach(function(data, index) {
      let storageCard = document.createElement("div");
      storageCard.className = "review-card";

      const newH5 = document.createElement("h5");
      newH5.className = "card-id";
      newH5.innerText = data.id;
      storageCard.appendChild(newH5);

      const newP = document.createElement("p");
      newP.className = "card-review";
      newP.innerText = data.review;
      storageCard.appendChild(newP);
      // 렌더링 시 삭제버튼도 함께 렌더링
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "삭제";
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', function() {
          let password = prompt('비밀번호를 입력하세요');
          verifyPasswordAndDelete(index, password);
      });
      storageCard.appendChild(deleteButton);
      // 렌더링 시 수정버튼도 함께 렌더링
      const editButton = document.createElement("button");
      editButton.innerHTML = "수정";
      editButton.className = 'edit-button';
      editButton.addEventListener('click', function(){
        let password = prompt('비밀번호를 입력하세요');
        verifyPasswordAndEdit(index,password)
      })
      storageCard.appendChild(editButton);
      document.getElementById("review-plate").appendChild(storageCard);
  });
}
function verifyPasswordAndEdit(index, password){
  let getData = JSON.parse(localStorage.getItem("reviewData"));
  if(password !== null && password.trim() !== "") {
    if(password === getData[index].password) {
      let newText = prompt('수정할 리뷰를 입력해주세요', getData[index].review);
      if(newText !== null) {
        getData[index].review = newText;
        localStorage.setItem("reviewData", JSON.stringify(getData));
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
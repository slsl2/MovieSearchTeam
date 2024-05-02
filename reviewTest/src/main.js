if (localStorage.getItem("defaultData")) {

}else{
    localStorage.setItem("defaultData", JSON.stringify([]))
}

if (localStorage.getItem("reviewData")) {
  let getData = JSON.parse(localStorage.getItem("reviewData"));
  getData.forEach(function(getData) {
    let storageCard = document.createElement("div");
    storageCard.className = "review-card";
  
    const newH5 = document.createElement("h5");
    newH5.className = "card-id";
    newH5.innerText = getData.id;
    storageCard.appendChild(newH5);
  
    const newP = document.createElement("p");
    newP.className = "card-review";
    newP.innerText = getData.review;
    storageCard.appendChild(newP);
  
    document.getElementById("review-plate").appendChild(storageCard);
  });
}else{
    localStorage.setItem("reviewData", JSON.stringify([]))
}

let getData = JSON.parse(localStorage.getItem("reviewData"));
console.log(getData);


function setReviewData() {

  // 각각 input창에 작성한 내용 가져오기
  let textId = document.getElementById("id-text").value;
  let textPassword = document.getElementById("passward-text").value;
  let textReview = document.getElementById("review-text").value;

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
}

// 배열 데이터 지우기
// function deleteReviewData() {
//   let Datageto = JSON.parse(localStorage.getItem("reviewData"));
//   Datageto.splice(4,1);
//   console.log(Datageto);
//   localStorage.setItem("reviewData", JSON.stringify(Datageto));

// }


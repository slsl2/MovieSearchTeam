if (localStorage.getItem("reviewData")) {
    let getData = JSON.parse(localStorage.getItem("reviewData"));
    // 매개변수로 data, index를 받아옴
    getData.forEach(function(data,index) {
    
      let newUl = document.createElement("ul");
      newUl.className = "review-card"
        
      const newLi = document.createElement("li");
      newLi.className = "review-li";
      newUl.appendChild(newLi);

      const newDiv = document.createElement('div');
      newDiv.className = "review-list-top";
      newLi.appendChild(newDiv);

      const newSpan = document.createElement('span');
      newSpan.className = "review-author";
      newSpan.innerHTML = data.id;
      newDiv.appendChild(newSpan)

      const newBtnWrapDiv = document.createElement('div');
      newBtnWrapDiv.className = "review-list-bottom";
      newLi.appendChild(newBtnWrapDiv);

      const newP = document.createElement('p');
      newP.className = "review-content";
      newP.innerHTML = data.review;
      newBtnWrapDiv.appendChild(newP)

      const newSetDiv = document.createElement('div');
      newSetDiv.className = "review-settings"
      newBtnWrapDiv.appendChild(newSetDiv)

      const newBtnDiv = document.createElement('div')
      newBtnDiv.className = "review-buttons";
      newSetDiv.appendChild(newBtnDiv)

      const newUpDateBtn = document.createElement('button');
      newUpDateBtn.innerHTML = "수정"
      newUpDateBtn.className = "update-btn";
      newUpDateBtn.addEventListener('click',function(){
        let password = prompt('비밀번호를 입력하세요');
        verifyPasswordAndEdit(index,password);
      })
      newBtnDiv.appendChild(newUpDateBtn)

      const newVerticalDiv = document.createElement('div');
      newVerticalDiv.className = "vertical-line";
      newBtnDiv.appendChild(newVerticalDiv)

      const newDeleteBtn = document.createElement('button');
      newDeleteBtn.innerHTML = "삭제"
      newDeleteBtn.className = "delete-btn"
      newDeleteBtn.addEventListener('click',function(){
        let password = prompt('비밀번호를 입력하세요')
        verifyPasswordAndDelete(index,password)
      })
      newBtnDiv.appendChild(newDeleteBtn)
      document.getElementById("review-list-wrap").appendChild(newUl);
    });
  }else{
      localStorage.setItem("reviewData", JSON.stringify([]))
  }
  
  let getData = JSON.parse(localStorage.getItem("reviewData"));
  
  
  function setReviewData() {
  
    let textId = document.getElementById("author").value;
    let textPassword = document.getElementById("password").value;
    let textReview = document.getElementById("review").value;

    // input에 빈 값이 있을경우 경고메세지 띄움
    if (textId === "" || textPassword === "" || textReview === "") {
        alert('모든 항목을 입력해주세요');
    } else {
        // 가져온 내용을 카드로 작성
        let newCard = document.createElement("div");
        newCard.className = "review-card";

        const newSpan = document.createElement("span");
        newSpan.className = "card-id";
        newSpan.innerText = textId;
        newCard.appendChild(newSpan);

        const newTextArea = document.createElement("textarea");
        newTextArea.className = "card-review";
        newTextArea.innerText = textReview;
        newCard.appendChild(newTextArea);

        // HTML에 새 리뷰를 추가
        document.getElementById("review-list-wrap").appendChild(newCard);

        // 가져온 내용을 스토리지에 저장하기
        let reviewPlus = { id: textId, password: textPassword, review: textReview };
        let getData = JSON.parse(localStorage.getItem("reviewData")) || [];
        getData.push(reviewPlus);
        localStorage.setItem("reviewData", JSON.stringify(getData));

        alert("저장완료");
        render();
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
    document.getElementById("review-list-wrap").innerHTML = "";
    let getData = JSON.parse(localStorage.getItem("reviewData")) || [];
    getData.forEach(function(data, index) {
        const newUl = document.createElement("ul");
        newUl.className = "review-card"
          
        const newLi = document.createElement("li");
        newLi.className = "review-li";
        newUl.appendChild(newLi);
  
        const newDiv = document.createElement('div');
        newDiv.className = "review-list-top";
        newLi.appendChild(newDiv);
        
        const newSpanAuthor = document.createElement('span');
        newSpanAuthor.className = "review-author";
        newSpanAuthor.innerHTML = data.id;
        newDiv.appendChild(newSpanAuthor)
  
        const newBtnWrapDiv = document.createElement('div');
        newBtnWrapDiv.className = "review-list-bottom";
        newLi.appendChild(newBtnWrapDiv);
  
        const newP = document.createElement('p');
        newP.className = "review-content";
        newP.innerHTML = data.review;
        newBtnWrapDiv.appendChild(newP)
  
        const newSetDiv = document.createElement('div');
        newSetDiv.className = "review-settings"
        newBtnWrapDiv.appendChild(newSetDiv)
  
        const newBtnDiv = document.createElement('div')
        newBtnDiv.className = "review-buttons";
        newSetDiv.appendChild(newBtnDiv)
  
        const newUpDateBtn = document.createElement('button');
        newUpDateBtn.innerHTML = "수정"
        newUpDateBtn.className = "update-btn";
        newUpDateBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력하세요');
          verifyPasswordAndEdit(index,password);
        })
        newBtnDiv.appendChild(newUpDateBtn)
  
        const newVerticalDiv = document.createElement('div');
        newVerticalDiv.className = "vertical-line";
        newBtnDiv.appendChild(newVerticalDiv)
  
        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.innerHTML = "삭제"
        newDeleteBtn.className = "delete-btn"
        newDeleteBtn.addEventListener('click',function(){
          let password = prompt('비밀번호를 입력하세요')
          verifyPasswordAndDelete(index,password)
        })
        newBtnDiv.appendChild(newDeleteBtn)
        document.getElementById("review-list-wrap").appendChild(newUl);
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
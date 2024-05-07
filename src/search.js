import { validateSearch } from "./validate.mjs";

export const searchMovie = () => {
  const cardList = document.querySelector("#mycards");
  document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.querySelector("#searchInput");
    searchBox.addEventListener("keyup", function () {
      // keyup : 키를 놓을 때 이벤트 발생

      const filterValue = searchBox.value.toLowerCase();
      const cards = cardList.querySelectorAll(".col");
      cards.forEach(function (card) {
        const titleText = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        if (titleText.includes(filterValue)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
      logger(validateSearch, filterValue);
    });
  });

  function logger(validateFn, param) {
    const [code, msg] = validateFn(param);
    const searchValidation = document.querySelector("#search-validation");
    msg
      ? (searchValidation.textContent = `['${msg}']`)
      : (searchValidation.textContent = "");
  }
};

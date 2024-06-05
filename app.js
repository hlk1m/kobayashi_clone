"use strict";

const homeBtn = document.querySelector(".header__logo");
const projectsBtn = document.querySelector(".header__projects__btn");
const allBtn = document.querySelector(".header__all__btn");

const allList = document.querySelectorAll(".menu__all__list");
const projectsMenu = document.querySelector(".menu__projects");
const allMenu = document.querySelector(".menu__all");
const main = document.querySelector(".main");

function onScrollMain() {
  const scroll = window.scrollY;
  const header = document.querySelector(".header");

  if (scroll >= 500) {
    header.style.opacity = "1";
    window.removeEventListener("scroll", onScrollMain);
  }
}

function onToggleMenu(target) {
  const overlay = document.querySelector(".overlay");

  const other = target === projectsMenu ? allMenu : projectsMenu;

  if (!target.classList.contains("hidden")) {
    // Side menu를 닫을 때 - hidden class가 없을 때
    main.style.transform = "translateX(0)";
    overlay.classList.add("hidden");
    //
  } else if (target === projectsMenu) {
    overlay.classList.remove("hidden");
    main.style.transform = "translateX(100px)";
    //
  } else if (target === allMenu) {
    overlay.classList.remove("hidden");
    main.style.transform = "translateX(-100px)";
  }

  target.classList.toggle("hidden");
  // 중복 방지
  other.classList.add("hidden");
}

function onMouseOverMenu(e) {
  const target = e.target;
  const type = target.dataset.type;
  const classList = target.classList[0];

  const toggleClass = (target) => target.classList.toggle("hidden");

  if (type) return;

  switch (classList) {
    case "menu__all__list": {
      return toggleClass(target.lastElementChild);
    }
    case "menu__all__a": {
      return toggleClass(target.nextElementSibling);
    }
    case "menu__all__hover": {
      return toggleClass(target);
    }
    case "hover__list": {
      return toggleClass(target.parentElement);
    }
    case "hover__list__heading": {
      const ul = target.parentElement.parentElement;
      return toggleClass(ul);
    }
    case "hover__list__contents": {
      const ul = target.parentElement.parentElement;
      return toggleClass(ul);
    }
    default:
      break;
  }
}

const getImgData = async () => {
  const accessKey = "6IrhqT0gfrZKjzbQcomAW-hOUciJchXSXsThXZLkeCw";
  const page = "30";

  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${page}`;

  await fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => printCardList(json))
    .catch((error) => console.log(error));
};

function makeListCard(imgUrl, description, name) {
  const li = document.createElement("li");
  li.className = "main__card__list";
  li.style.backgroundImage = `url("${imgUrl}")`;
  li.innerHTML = `
  <p class="main__hover__contents">
    <b>${description}</b>
    <span></span>
    ${name}
  </p>
`;
  return li;
}

function printCardList(data) {
  const ul = document.querySelector(".main__card-container");

  data.forEach((img, index) => {
    setTimeout(() => {
      const imgUrl = img.urls.small;
      const description = img.description
        ? img.description.slice(0, 10)
        : "Title";
      const name = img.user.first_name;
      const li = makeListCard(imgUrl, description, name);
      ul.appendChild(li);
    }, index * 70);
  });
}

function eventHandler() {
  window.addEventListener("scroll", onScrollMain);
  projectsBtn.addEventListener("click", () => onToggleMenu(projectsMenu));
  allBtn.addEventListener("click", () => onToggleMenu(allMenu));

  allList.forEach((list) => {
    list.addEventListener("mouseover", onMouseOverMenu);
    list.addEventListener("mouseout", onMouseOverMenu);
  });
}

eventHandler();
getImgData();

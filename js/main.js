const $txt = document.querySelector(".txt-title");
const content = "안녕하세요 :)\n모션그래픽 디자이너 이민호입니다.";
let contentIndex = 0;
let isDeleting = false; 

const typing = () => {
  if (!isDeleting) {
    // 타이핑 중일 때
    if (content[contentIndex] === "\n") {
      $txt.innerHTML += "<br />";
    } else {
      $txt.innerHTML += content[contentIndex];
    }
    contentIndex++;

    if (contentIndex === content.length) {
  
      isDeleting = true;
      setTimeout(() => {
        const eraseInterval = setInterval(() => {
          const text = $txt.innerHTML;
          $txt.innerHTML = text.slice(0, -1); 
          if ($txt.innerHTML.length === 0) {
            clearInterval(eraseInterval);
            contentIndex = 0;
            isDeleting = false;
          }
        }, 40); 
      }, 2000); 
    }
  }
};

// 타이핑 시작
setInterval(() => {
  if (!isDeleting && contentIndex < content.length) {
    typing();
  }
}, 160);


// 이미지 슬라이드
let imgIndex = 0;
let position = 0;
const IMG_WIDTH = 438;
const $btnPrev = document.querySelector(".btn-prev");
const $btnNext = document.querySelector(".btn-next");
const $slideImgs = document.querySelector(".slide-images");

let prev = function () {
  if (imgIndex > 0) {
    $btnNext.removeAttribute("disabled");
    position += IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    imgIndex = imgIndex - 1;
  }
  if (imgIndex == 0) {
    $btnPrev.setAttribute("disabled", "true");
  }
};

let next = function () {
  if (imgIndex < 5) {
    $btnPrev.removeAttribute("disabled");
    position -= IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    $slideImgs.style.transition = "transform .5s ease-out";
    imgIndex = imgIndex + 1;
  }
  if (imgIndex == 4) {
    $btnNext.setAttribute("disabled", "true");
  }
};

let init = function () {
  $btnPrev.setAttribute("disabled", "true");
  $btnPrev.addEventListener("click", prev);
  $btnNext.addEventListener("click", next);
};

init();

// 모달
const $modalBg = document.getElementsByClassName("modal-background");
const $btnOpen = document.getElementsByClassName("btn-open");
const $btnClose = document.getElementsByClassName("btn-close");

function modal(num) {
  $btnOpen[num].addEventListener("click", () => {
    $modalBg[num].style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  $btnClose[num].addEventListener("click", () => {
    $modalBg[num].style.display = "none";
    document.body.style.overflow = "unset";
  });
}

for (let i = 0; i < $btnOpen.length; i++) {
  modal(i);
}

// 스크롤바
let scrollTop = 0;
let bar = document.getElementsByClassName("bar-ing")[0];

window.addEventListener(
  "scroll",
  () => {
    scrollTop = document.documentElement.scrollTop;
    let per = Math.ceil(
      (scrollTop / (document.body.scrollHeight - window.outerHeight)) * 100
    );
    bar.style.width = per + "%";
  },
  false
);
/*Changing menu font color in scrolling*/
let menu = document.getElementsByClassName("main-menu")[0],
    a = menu.querySelectorAll("a"),
    about = document.getElementById("about"),
    thanks = document.getElementsByClassName("thanks")[0],
    contact = document.getElementById("contact");

window.onscroll = function () {
    let aOneHeight = a[0].getBoundingClientRect().bottom - a[0].getBoundingClientRect().top;
    if (a[0].getBoundingClientRect().bottom - aOneHeight / 2 > about.getBoundingClientRect().top) {
        setAColorsTopSect(about, "black", "white");
    }
    else {
        setStandartAColor();
    }
    if (a[0].getBoundingClientRect().bottom - aOneHeight / 2 > thanks.getBoundingClientRect().top) {
        setAColorsTopSect(thanks, "white", "black");
    }
    if (a[0].getBoundingClientRect().bottom - aOneHeight / 2 > contact.getBoundingClientRect().top) {
        setAColorsTopSect(contact, "black", "white");
    }
};

function setAColorsTopSect(section, colorAfter, colorBefore) {
    for (let i = 0; i < a.length; i++) {
        let aHeight = a[i].getBoundingClientRect().bottom - a[i].getBoundingClientRect().top;
        if (a[i].getBoundingClientRect().bottom - aHeight / 2 > section.getBoundingClientRect().top) {
            a[i].style.color = colorAfter;
        }
        else {
            a[i].style.color = colorBefore;
        }
    }
}
function setStandartAColor() {
    for (let i = 0; i < a.length; i++) {
        a[i].style.color = "white";
    }
}

/*Slider functionality*/
let previousBtn = document.querySelector(".slider-previous");
let nextBtn = document.querySelector(".slider-next");

let slides = document.querySelector(".slider-slides");
let slidesNumber = slides.children.length;

//Default number of items in slider
let itemsNumber = 5;

let currentSlide = 0;
let currentOffset = 0;
function updateSliderLeft() {
    let offset;
    if (currentSlide == slidesNumber) {
        offset = 0;
        currentOffset = offset;
        currentSlide = -1;
    }
    else if (currentSlide < 0) {
        slideWidth = slides.children[currentSlide + itemsNumber].clientWidth;
        let slideMargin = window.getComputedStyle(slides.children[currentSlide + itemsNumber]).marginRight;
        offset = currentOffset - slideWidth - Number(slideMargin.replace("px", ""));
        currentOffset = offset;
    }
    else {
        slideWidth = slides.children[currentSlide].clientWidth;
        let slideMargin = window.getComputedStyle(slides.children[currentSlide]).marginRight;
        offset = currentOffset - slideWidth - Number(slideMargin.replace("px", ""));
        currentOffset = offset;
    }
    for (let i = 0; i < slidesNumber; i++) {
        slides.children[i].setAttribute("style", `transform: translate(${offset}px)`);
    }
}
function updateSliderRight() {
    let offset;
    if (currentSlide == -itemsNumber) {
        offset = 0;
        currentOffset = offset;
        currentSlide = 1;
    }
    else if (currentSlide > 0) {
        let slideWidth = slides.children[currentSlide - 1].clientWidth;
        let slideMargin = window.getComputedStyle(slides.children[currentSlide - 1]).marginRight;
        offset = currentOffset + slideWidth + Number(slideMargin.replace("px", ""));
        currentOffset = offset;
    }
    else {
        let slideWidth = slides.children[currentSlide + itemsNumber - 1].clientWidth;
        let slideMargin = window.getComputedStyle(slides.children[currentSlide + itemsNumber - 1]).marginRight;
        offset = currentOffset + slideWidth + Number(slideMargin.replace("px", ""));
        currentOffset = offset;
    }
    for (let i = slidesNumber - 1; i >= 0; i--) {
        slides.children[i].setAttribute("style", `transform: translate(${offset}px)`);
    }
}

previousBtn.addEventListener("click", () => {
    updateSliderLeft();
    currentSlide++;
});

nextBtn.addEventListener("click", () => {
    updateSliderRight();
    currentSlide--;
});

//For large screen hide arrow
let slidesWidthSum = 0;
let slidesWidth = slides.getBoundingClientRect().width - 200; //200 it is border width
for (let i = 0; i < slidesNumber; i++) {
    slidesWidthSum += slides.children[i].getBoundingClientRect().width;
    slidesWidthSum += Number(window.getComputedStyle(slides.children[i]).marginRight.replace("px", ""));
}
if (slidesWidth > slidesWidthSum) {
    let sliderPrevious = document.querySelector(".slider-previous");
    let sliderNext = document.querySelector(".slider-next");
    sliderPrevious.setAttribute("style", "display: none");
    sliderNext.setAttribute("style", "display: none");
    slides.setAttribute("style", "justify-content: center");
}

/*Side menu functionality for medium and small screen*/
if (window.matchMedia("(max-width: 993px)").matches) {
    let listMenu = document.querySelectorAll(".main-menu ul li");
    let click = document.getElementsByClassName("click")[0];
    click.addEventListener("click", () => {
        let burger = document.getElementById("burger");
        burger.classList.toggle("active");
        document.getElementById("home").classList.toggle("menu-open");
        if (burger.classList.contains("active")) {
            if (window.matchMedia("(max-width: 481px)").matches) {
                let button = document.querySelectorAll(".main .button")[0];
                let buttonOffset = button.parentElement.getBoundingClientRect().width / 2 - 30 - 20;
                button.style.transform = (`translateX(${buttonOffset}px)`);
            }
            listMenu.forEach((item, i, listMenu) => {
                item.style.display = "block";
            });
            setTimeout(() => {
                listMenu.forEach((item, i, listMenu) => {
                    item.style.opacity = "1";
                });
                listMenu.forEach((item, i, listMenu) => {
                    item.style.transform = ("translateY(0px)");
                });
            }, 200);
        }
        else {
            if (window.matchMedia("(max-width: 481px)").matches) {
                let button = document.querySelectorAll(".main .button")[0];
                button.style.transform = ("translateX(0px)");
            }
            listMenu.forEach((item, i, listMenu) => {
                item.style.opacity = "0";
            });
            listMenu.forEach((item, i, listMenu) => {
                item.style.transform = ("translateY(-40px)");
            });
            setTimeout(() => {
                listMenu.forEach((item, i, listMenu) => {
                    item.style.display = "none";
                });
            }, 500);
        }
    });
}

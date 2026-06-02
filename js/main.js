let index = 0;
const slides = document.querySelector(".slides");
const total = slides.children.length;

setInterval(() => {
    index++;
    if (index >= total) index = 0;
    slides.style.transform = `translateX(-${index * 100}%)`;
}, 3000);
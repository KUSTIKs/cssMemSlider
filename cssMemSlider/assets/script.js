const slider = document.querySelector('.slider');
const sliderPaginationBoxes = slider.querySelectorAll(
  '.slider__pagination-box'
);
const sliderTrack = slider.querySelector('.slider__track');
const sliderSlides = [...slider.querySelectorAll('.slider__slide')];
const sliderContainer = slider.querySelector('.slider__container');
const slideWidth = sliderContainer.offsetWidth;
let currentSlide = 0;

sliderPaginationBoxes.forEach((box, idx) => {
  box.addEventListener('click', () => setCurrentSlide(idx));
});

function setCurrentSlide(idx) {
  currentSlide = idx;
  slideAndPaginate();
}

function paginate() {
  sliderPaginationBoxes.forEach((box) => {
    box.classList.remove('slider__pagination-box_current');
  });
  sliderPaginationBoxes[currentSlide].classList.add(
    'slider__pagination-box_current'
  );
}

function slide() {
  sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  // sliderSlides.slice(0, currentSlide - 3).forEach((slide) => {
  //   slide.style.right = '-100%';
  // });
  // sliderSlides.slice(currentSlide).forEach((slide) => {
  //   slide.style.left = '-100%';
  // });
}

function slideAndPaginate() {
  paginate();
  slide();
}

window.addEventListener('load', slideAndPaginate);

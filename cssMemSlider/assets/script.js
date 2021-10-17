const slider = document.querySelector('.slider');
const sliderSlides = [...slider.querySelectorAll('.slider__slide')];
const sliderContainer = slider.querySelector('.slider__container');
const sliderPagination = slider.querySelector('.slider__pagination');
const slideWidth = sliderContainer.offsetWidth;
const sliderCaption = slider.querySelector('.slider__slide-caption');
let curSlideIndex = 0;
let prevSlideIndex = 0;
let lastCaption = null;
const sliderPaginationBoxes = Array.from(Array(sliderSlides.length), (_, idx) =>
  createPaginationBox(idx)
);
const slideCopies = [];

function createPaginationBox(idx) {
  const paginationBox = document.createElement('div');
  paginationBox.classList.add('slider__pagination-box');
  paginationBox.classList.toggle(
    'slider__pagination-box_current',
    idx === curSlideIndex
  );
  paginationBox.innerHTML = '<div class="slider__pagination-bullet"></div>';
  sliderPagination.appendChild(paginationBox);
  paginationBox.addEventListener('click', () => setCurSlideIndex(idx));
  return paginationBox;
}

function createCaption(text) {
  const caption = document.createElement('p');
  caption.innerText = text;
  sliderCaption.appendChild(caption);
  return caption;
}

function setCurSlideIndex(idx) {
  prevSlideIndex = curSlideIndex;
  curSlideIndex = idx;
  slideAndPaginate();
}

function paginate() {
  sliderPaginationBoxes.forEach((box, idx) => {
    box.classList.toggle(
      'slider__pagination-box_current',
      curSlideIndex === idx
    );
  });
}

function slide() {
  slideCopies.forEach((node) => node.remove());
  const curSlide = sliderSlides[curSlideIndex].cloneNode(true);
  const curCaption = createCaption(curSlide.dataset.caption);

  if (curSlideIndex === prevSlideIndex) {
    curSlide.style.display = 'block';
    curSlide.style.left = 0;
    sliderContainer.appendChild(curSlide);
    sliderCaption.appendChild(curCaption);
    slideCopies.push(curSlide);
    return;
  }

  const prevSlide = sliderSlides[prevSlideIndex].cloneNode(true);
  const side = curSlideIndex > prevSlideIndex ? 'left' : 'right';
  const isLeft = side === 'left';
  curSlide.style.display = 'block';
  curSlide.style.left = isLeft ? '100%' : '-100%';
  curSlide.style.zIndex = 1;
  prevSlide.style.display = 'block';
  prevSlide.style.left = 0;

  sliderContainer.append(prevSlide, curSlide);
  slideCopies.push(curSlide, prevSlide);

  prevCaption = createCaption(prevSlide.dataset.caption);
  sliderCaption.innerHTML = '';
  sliderCaption.append(prevCaption, curCaption);
  captionWidth = prevCaption.offsetWidth;
  curCaption.style.left = isLeft
    ? `${curCaption.offsetWidth}px`
    : `-${captionWidth}px`;

  curCaption?.animate(
    { left: '0' },
    { duration: 500, easing: 'ease', fill: 'forwards' }
  );
  prevCaption?.animate(
    {
      left: isLeft ? `-${captionWidth}px` : `${curCaption.offsetWidth}px`,
      opacity: 0,
    },
    { duration: 500, easing: 'ease', fill: 'forwards' }
  );
  curSlide.animate(
    { left: 0 },
    { duration: 500, easing: 'ease', fill: 'forwards' }
  );
  prevSlide.animate(
    { left: isLeft ? '-100%' : '100%' },
    { duration: 500, easing: 'ease' }
  );
}

function slideAndPaginate() {
  paginate();
  slide();
}

window.addEventListener('load', slideAndPaginate);

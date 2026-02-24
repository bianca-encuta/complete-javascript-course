'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* Lazy loading images */
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  console.log(entry)

  if(!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
  entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshhold: 0,
  rootMargin: '200px'

});
imgTargets.forEach(img=>imgObserver.observe(img));

// Slider
const slider = function() {

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');

// Functions
const createDots = function() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  });
};
createDots()

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(d => d.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activateDot(curSlide);

const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}

goToSlide(0);
activateDot(curSlide);

const nextSlide = function(){
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  
  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function(){ 
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  
  goToSlide(curSlide);
  activateDot(curSlide);
};

function init(){
  goToSlide(0);
  activateDot(0);
}

init()

// Event Handlers 
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  if( e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')) {
    const curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide)
    activateDot(curSlide)
  }
});
}

slider()
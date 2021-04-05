import { ieFix } from './utils/ie-fix';
import { iosVhFix } from './utils/ios-vh-fix';

// Utils
// ---------------------------------

ieFix();
iosVhFix();


// my dumb code
// ---------------------------------



function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}
const scrollBarWidth = getScrollbarWidth();


const preloader = document.querySelector('.preloader');
const preloaderLogo = document.querySelector('.preloader .img-wrap');
const startButton = document.querySelector('.preloader .start-button');
const globalSiteWrapper = document.querySelector('.wrapper');
const bodyHtml = document.querySelector('html');


const fadeInCss = (duration) => `transition: visibility ease ${duration}, opacity ease ${duration};opacity: 1;visibility:visible;`;
const fadeOutCss = (duration) => `transition: visibility ease ${duration}, opacity ease ${duration};opacity: 0;visibility:hidden;`;

const globalSiteWrapperToggle = () => {
  globalSiteWrapper.classList.toggle('wrapper--no-scrollbar');
}
const onLoadEmulator = (fetchingDelay) => new Promise((resolve) => {
  setTimeout(resolve, fetchingDelay);
});


globalSiteWrapper.style.cssText = `opacity: 0;`;
globalSiteWrapperToggle();

onLoadEmulator(1000)
  .then(() => {
    preloaderLogo.style.cssText = fadeInCss('3s');
  });

onLoadEmulator(4000)
  .then(() => {
    startButton.style.cssText = `animation: 2s ease-in-out 1s infinite alternate blink, 1s ease-in 0s 1 fadein;`;
    preloader.addEventListener('click', closePreloader);
    document.addEventListener('keydown', closePreloader);
  });

const closePreloader = () => {
  const duration = 1;
  preloader.style.cssText = `transition: opacity ease ${duration}s;opacity:0;`;
  setTimeout(() => {
    preloader.style.cssText += `display:none;`;
    globalSiteWrapperToggle();
    globalSiteWrapper.style.cssText = `transition: opacity ease 1.2s;opacity: 1;`;
    preloader.removeEventListener('click', closePreloader);
    document.removeEventListener('keydown', closePreloader);
  }, duration * 1000 + 50);
}

// menu
const burgerMenu = document.querySelector('.nav__list');
const burgerMenuButton = document.querySelector('.button-burger-mobile');
const burgerMenuLinks = document.querySelectorAll('.nav__link');
const headerTopLine = document.querySelector('.header__top-line');

const burgerMenuHandler = (duration) => {

  burgerMenuButton.classList.toggle('button-burger-mobile_active');
  if (!burgerMenu.classList.contains('nav__list-mobile_active')) {

    const paddingRight = scrollBarWidth + +/\d+/.exec(window.getComputedStyle(headerTopLine).paddingRight);

    bodyHtml.classList.toggle('scroll-lock');
    burgerMenu.classList.toggle('nav__list-mobile_active');
    setTimeout(() => {
      burgerMenu.style.cssText = fadeInCss(`${duration}s`);
    }, 0);
  } else {
    burgerMenu.style.cssText = fadeOutCss(`${duration}s`);
    setTimeout(() => {
      burgerMenu.classList.toggle('nav__list-mobile_active');
      bodyHtml.classList.toggle('scroll-lock');
      headerTopLine.removeAttribute('style');
    }, duration * 1000 + 50);
  }
}

const burgerMenuCleaner = () => {
  burgerMenuButton.classList.remove('button-burger-mobile_active');
  burgerMenu.removeAttribute('style');
  burgerMenu.classList.remove('nav__list-mobile_active');
  bodyHtml.classList.remove('scroll-lock');
  headerTopLine.removeAttribute('style');
}


burgerMenuButton.addEventListener('click', (e) => {
  e.preventDefault();
  burgerMenuHandler(0.3);
});

burgerMenuLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    // "scroll to" some code

    if (window.innerWidth < 769) {
      burgerMenuHandler(0.3);
    }
  });
});

const swiperConf = {
  direction: 'horizontal',
  loop: false,
  watchOverflow: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  navigation: {
    nextEl: '.swiper-wrapper .swiper-slide:nth-of-type(1)',
    prevEl: '.swiper-wrapper .swiper-slide:nth-of-type(2)',
  },
  breakpoints: {
    769: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: "auto",
    },
  }
};


const dataAttrButtonText = startButton.dataset.textMd;
const buttonText = startButton.innerHTML;
const swiper = new Swiper('.swiper-container', swiperConf);

if (window.innerWidth < 769) {
  startButton.innerHTML = dataAttrButtonText;
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 769) {
    startButton.innerHTML = dataAttrButtonText;
    burgerMenuCleaner();
  } else {
    startButton.innerHTML = buttonText;
    burgerMenuCleaner();
  }

});


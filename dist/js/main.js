"use strict";

var productCategories = document.querySelectorAll('.product-category');
var header = document.querySelector('header');
var productSlider = new Swiper('.product-slider', {
  slidesPerView: 4,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: '.product-section .slider-next',
    prevEl: '.product-section  .slider-prev'
  }
});
var testimonialSlider = new Swiper('.testimonial-slider', {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: '.testimonial-section .slider-next',
    prevEl: '.testimonial-section .slider-prev'
  }
});
window.addEventListener('scroll', function () {
  if (window.scrollY > 0) {
    header.classList.add('header-dark');
  } else {
    header.classList.remove('header-dark');
  }
});
productCategories.forEach(function (category) {
  category.addEventListener('click', function () {
    productCategories.forEach(function (item) {
      item.classList.remove('bg-white');
    });
    category.classList.add('bg-white');
  });
});
//# sourceMappingURL=main.js.map

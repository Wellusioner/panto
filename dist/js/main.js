"use strict";

var buyBtn = document.querySelector('.buy-now');
var mostSoldContent = document.querySelector('.bestseller-content');
var html = document.querySelector('html');
var mask = document.querySelector('.mask');
var catMenu = document.querySelector('#category-menu');
var headerCategory = document.querySelector('.header-category');
var closeMenuBtn = document.querySelector('#category-menu .close-menu');
var searchBtn = document.querySelectorAll('.search-btn, .search-close');
var searchBanner = document.querySelector('.search-banner');
var header = document.querySelector('.header'),
    headerBtns = document.querySelectorAll('.hamburger, .header-mask, nav .close-menu');
headerBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    html.classList.toggle('overflowed');
    header.classList.toggle('active');
  });
});
searchBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    searchBanner.classList.toggle('active');

    if (btn.classList.contains('search-btn')) {
      searchBanner.querySelector('input').focus();
    }
  });
});

if (buyBtn) {
  buyBtn.addEventListener('click', function () {
    var offsetTop = mostSoldContent.offsetTop;
    scroller(offsetTop);
  });
} // document.querySelectorAll('.nav-item').forEach(function(item){
//   const submenu = item.querySelector('.submenu');
//   item.addEventListener('click', function(e){
//     if(submenu){
//       e.preventDefault();
//       submenu.classList.toggle('active');
//     }
//   });
//   item.addEventListener('mouseleave', function(){
//     if(submenu){
//       submenu.classList.remove('active');
//     }
//   });
// });


headerCategory.addEventListener('click', function (e) {
  e.preventDefault();
  handleCategory();
});
mask.addEventListener('click', function () {
  handleCategory(true);
});
closeMenuBtn.addEventListener('click', function () {
  handleCategory(true);
});

function handleCategory() {
  var isRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (isRemove) {
    html.classList.remove('overflowed');
    mask.classList.remove('active');
    catMenu.classList.remove('opened');
    headerCategory.classList.remove('active');
  } else {
    html.classList.add('overflowed');
    mask.classList.add('active');
    catMenu.classList.add('opened');
    headerCategory.classList.add('active');
  }
} //Header Links


var menuLink = document.querySelectorAll('.menu-link');
menuLink.forEach(function (link) {
  link.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
      header.classList.remove('active');
    }
  });
}); //Category Accordion

var accLinks = document.querySelectorAll('.category-title');
accLinks.forEach(function (accBtn) {
  accBtn.addEventListener('click', function () {
    var allLinks = accBtn.closest('.sub-menu').querySelectorAll('.category-title');
    var currContent = accBtn.closest('.submenu-category').querySelector('.category-list');
    var allContents = accBtn.closest('.sub-menu').querySelectorAll('.category-list');
    allLinks.forEach(function (btn) {
      if (btn != accBtn) {
        btn.classList.remove('active');
      }
    });

    if (accBtn.classList.contains('active')) {
      accBtn.classList.remove('active');
    } else {
      accBtn.classList.add('active');
    }

    allContents.forEach(function (ct) {
      if (ct != currContent) {
        ct.style.height = null;
      }
    });

    if (currContent.style.height) {
      currContent.style.height = null;
    } else {
      currContent.style.height = 400 + 'px';
    }
  });
});
/* Tab starts */

var tabGroup = document.querySelectorAll('.tab-wrapper');
var tabLinks = document.querySelectorAll('[data-tab-id]');
tabLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var tabId = link.getAttribute('data-tab-id');

    if (tabId) {
      var tabWrapper = link.closest('.tab-wrapper');

      if (tabWrapper) {
        var content = tabWrapper.querySelector('[data-content-id="' + tabId + '"]');
        handleTabMenu(tabWrapper, link);
        handleTabContent(tabWrapper, content);
      }
    }
  });
});

function handleTabMenu(wrapper, curr) {
  var menus = wrapper.querySelectorAll('[data-tab-id]');
  menus.forEach(function (link) {
    link.classList.remove('active');
  });
  curr.classList.add('active');
}

function handleTabContent(wrapper, curr) {
  var list = wrapper.querySelectorAll('[data-content-id]');
  list.forEach(function (temp) {
    temp.classList.remove('fadeIn', 'show', 'active');
  });
  curr.classList.add('fadeIn', 'show', 'active');
}

tabGroup.forEach(function (single) {
  single.querySelector('[data-tab-id]').click();
});
/* Tab ends */

var bestsellerSwiper = new Swiper('.bestseller-swiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  navigation: {
    prevEl: '.navigation-group .swiper-left-button',
    nextEl: '.navigation-group .swiper-right-button'
  },
  breakpoints: {
    400: {
      slidesPerView: 1
    },
    991: {
      slidesPerView: 2
    }
  }
});
var thumbSlider = new Swiper('.thumbnail-group', {
  spaceBetween: 10,
  slidesPerView: 4,
  watchSlidesVisibility: true,
  watchSlidesProgress: true // navigation: {
  //   nextEl: '.product-slider .prev-button',
  //   prevEl: '.product-slider .next-button',
  // },

});
var productSlider = new Swiper('.gallery-group', {
  spaceBetween: 10,
  navigation: {
    prevEl: '.product-slider .prev-button',
    nextEl: '.product-slider .next-button'
  },
  thumbs: {
    swiper: thumbSlider
  }
});
var priceRange = document.querySelector('#price-range');
var priceInputs = document.querySelectorAll('.price-value');

if (priceRange) {
  noUiSlider.create(priceRange, {
    start: [1000, 100000],
    connect: true,
    step: 1000,
    format: wNumb({
      decimals: 0,
      thousand: ' '
    }),
    range: {
      'min': 1000,
      'max': 100000
    }
  });
  priceRange.noUiSlider.on('update', function (values, handle) {
    if (priceInputs) {
      priceInputs[0].value = values[0];
      priceInputs[1].value = values[1];
    }
  });
} //product amount


document.querySelectorAll('.product-number button').forEach(function (button) {
  button.addEventListener('click', function () {
    var type = button.getAttribute('data-type');
    var input = document.querySelector('.product-number input');
    var val = parseInt(input.value);

    if (type === '+') {
      input.value = val + 1;
    } else if (type === '-') {
      input.value = val === 1 ? 1 : val - 1;
    }
  });
});
document.querySelectorAll('.minus, .plus').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var input = btn.parentNode.querySelector('input');
    var amount = parseInt(input.value);
    var singlePrice = parseFloat(btn.closest('tr').querySelector('.single-price').getAttribute('data-price'));
    var overall = btn.closest('tr').querySelector('.overall-price');

    if (btn.classList.contains('plus')) {
      amount += 1;
    } else if (btn.classList.contains('minus')) {
      amount = amount === 1 ? 1 : amount - 1;
    }

    input.value = amount;
    overall.innerHTML = '$' + singlePrice * amount;
    overall.setAttribute('data-overall', singlePrice * amount);
  });
}); //Handle filter

var filterBtn = document.querySelector('.filter-btn');

if (filterBtn) {
  filterBtn.addEventListener('click', function () {
    var filter = document.querySelector('.filter-side');

    if (filter.style.height) {
      filter.style.height = null;
    } else {
      filter.style.height = filter.scrollHeight + 'px';
    }
  });
}

function scroller(px) {
  window.scrollTo({
    top: px,
    behavior: 'smooth'
  });
}
//# sourceMappingURL=main.js.map

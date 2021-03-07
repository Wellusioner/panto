const buyBtn = document.querySelector('.buy-now');
const mostSoldContent = document.querySelector('.bestseller-content');

if(buyBtn){
  buyBtn.addEventListener('click', function(){
    const offsetTop = mostSoldContent.offsetTop;
    scroller(offsetTop);
  });
}

document.querySelectorAll('.nav-item').forEach(function(item){
  const submenu = item.querySelector('.submenu');
  item.addEventListener('click', function(e){
    if(submenu){
      e.preventDefault();
      submenu.classList.toggle('active');
    }
  });

  item.addEventListener('mouseleave', function(){
    if(submenu){
      submenu.classList.remove('active');
    }
  });
});


const bestsellerSwiper = new Swiper('.bestseller-swiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  navigation: {
    prevEl: '.navigation-group .swiper-left-button',
    nextEl: '.navigation-group .swiper-right-button',
  },
  breakpoints: {
    575: {
      slidesPerView: 2
    },
    991: {
      slidesPerView: 3
    }
  }
});

const thumbSlider = new Swiper('.thumbnail-group', {
  spaceBetween: 10,
  slidesPerView: 4,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.product-slider .prev-button',
    prevEl: '.product-slider .next-button',
  },
});
const productSlider = new Swiper('.gallery-group', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.product-slider .prev-button',
    prevEl: '.product-slider .next-button',
  },
  thumbs: {
    swiper: thumbSlider
  }
});

const priceRange = document.querySelector('#price-range');
const priceInputs = document.querySelectorAll('.price-value');

if(priceRange){
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
    if(priceInputs){
      priceInputs[0].value = values[0];
      priceInputs[1].value = values[1];
    }
  });
}

//product amount
document.querySelectorAll('.product-number button').forEach(function(button){
  button.addEventListener('click', function(){
    const type = button.getAttribute('data-type');
    const input = document.querySelector('.product-number input');
    const val = parseInt(input.value);
    if(type === '+'){
      input.value = val + 1;
    }else
    if(type === '-'){
      input.value = val === 1 ? 1 : val - 1;
    }
  });
});


/* Tab starts */
const tabGroup = document.querySelectorAll('.tab-wrapper');
const tabLinks = document.querySelectorAll('[data-tab-id]');

tabLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      const tabId = link.getAttribute('data-tab-id');
      if(tabId){
        const tabWrapper = link.closest('.tab-wrapper');
        
        if(tabWrapper){
          const content = tabWrapper.querySelector('[data-content-id="' + tabId +'"]');
          handleTabMenu(tabWrapper, link);
          handleTabContent(tabWrapper, content);
        }
      }
      
    });
});

function handleTabMenu(wrapper, curr){
  const menus = wrapper.querySelectorAll('[data-tab-id]');
  menus.forEach(function(link){
    link.classList.remove('active');
  });
  curr.classList.add('active');
}
function handleTabContent(wrapper, curr){
  const list = wrapper.querySelectorAll('[data-content-id]');
  list.forEach(function(temp){
    temp.classList.remove('fadeIn');
    temp.style.display = 'none';
  });
  curr.style.display = 'block';
  curr.classList.add('fadeIn');
}
tabGroup.forEach(function(single){
  single.querySelector('[data-tab-id]').click();
});
/* Tab ends */


function scroller(px){
  window.scrollTo({
    top: px,
    behavior: 'smooth'
  });
}
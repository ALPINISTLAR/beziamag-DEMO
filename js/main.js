// =============
const elsTabsItem = document.querySelectorAll('.tabs__item');
const elsTabLink = document.querySelectorAll('.js-tab-link');
const elsTabpanels = document.querySelectorAll('.tabpanels__item');
const apiUrl = 'https://dummyjson.com/products';


function DeactivateTabItems () {
  elsTabsItem.forEach(function (elTabsItem) {
    elTabsItem.classList.remove('tabs__item--active');
  });
}

elsTabLink.forEach(function (elTabLink) {
  elTabLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    DeactivateTabItems();
    elTabLink.parentElement.classList.add('tabs__item--active');
  });
});


function showTab(tabNumber) {
  // Barcha panellar yashiriladi
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabPanels.forEach(panel => {
    panel.style.display = 'none';
    panel.style.opacity = 0;
  });

  // Tanlangan tabni ko'rsatish
  const selectedTab = document.getElementById(`tab${tabNumber}`);
  selectedTab.style.display = 'block';

  // Tranzitsiyalarni boshlash
  setTimeout(() => {
    selectedTab.style.opacity = 1;
  }, 10);
}

// =================

// Sticky header
window.onscroll = function() {stickyHeader()};

var header = document.querySelector("header");
var sticky = header.offsetTop;
const hero = document.querySelector('.hero');
const contactPage = document.querySelector('.contact-page');
const aboutPage = document.querySelector('.about-page');
const productsInner = document.querySelector('.products__inner');
const productDetail = document.querySelector('.product-details-container');


function stickyHeader() {
  if (productDetail) {
    header.style.position = 'static';
  }
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    if (hero) {
      hero.classList.add('hero-pt');
    };
    if (contactPage) {
      contactPage.style.paddingTop = '240px';
    };
    if (aboutPage) {
      aboutPage.style.paddingTop = '240px';
    };
    if (productsInner) {
      productsInner.style.paddingTop = '190px';
    }
  } else {
    header.classList.remove("sticky");
    if (hero) {
      hero.classList.remove('hero-pt');
    }
    if (contactPage) {
      contactPage.style.paddingTop = '';
    }
    if (aboutPage) {
      aboutPage.style.paddingTop = '';
    }
    if (productsInner) {
      productsInner.style.paddingTop = '';
    }
  }
}

// == Product cards
function productCard(product) {
  return `<li class="products__list-item product-card" data-id="${product.id}">
<img class="product-card__img" src="${product.thumbnail}" alt="${product.title}">
  <div class="product-card__info">
    <h3 class="product-card__title">${product.title}</h3>
    <span class="product-card__price">$${product.price}</span>
  </div>
  </li>`;
}


const productList = document.querySelector('.products__list');

if (productList) {
  productList.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.product-card');
    const productId = clickedElement.dataset.id;
    window.location.href = `details.html?id=${productId}`;
  });
}


async function appendCard(skip, count) {
  const elProductList = document.querySelector('.products__list');
  let cardsHtml = '';

  if (elProductList) {
    try {
      // API dan ma'lumotlarni olish
      const res = await fetch(apiUrl);
      const jsonData = await res.json();

      // Agar ma'lumotlar "products" nomli maydon ichida bo'lsa
      const data = jsonData.products;

      // Faqat count ta ma'lumotni olish
      const limitedData = data.slice(skip, count);

      // Har bir mahsulot uchun cardHtml ni qo'shish
      limitedData.forEach((product) => {
        cardsHtml += productCard(product);
      });

      // ProductList ga cardHtml ni qo'shish
      elProductList.innerHTML += cardsHtml;
    } catch (error) {
      console.error("Ma'lumotlarni olishda xatolik:", error);
    }
  }
}

 async function getProductById(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ma\'lumotlar olishda xatolik:', error);
    throw error;
  }
}

// URL orqali id ni olish
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

getProductById(productId)
  .then((productData) => {
    // Ma'lumotlarni qo'lipga joylash
    const detailsPage = document.getElementById('product-details');
    detailsPage.innerHTML = `
      <div class="image-showcase">
      <swiper-container style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="mySwiper" thumbs-swiper=".mySwiper2" space-between="10" navigation="true" loop="true">
      ${productData.images.map(image => `<swiper-slide><img src="${image}" /></swiper-slide>`).join('')}
      </swiper-container>

      <swiper-container class="mySwiper2" slides-per-view="4" free-mode="true" watch-slides-progress="true">
      ${productData.images.map(image => `<swiper-slide><img src="${image}" /></swiper-slide>`).join('')}
      </swiper-container>
      </div>

      <div class="product-page__info">
      <div class="product-info">
      <div class="product-info__manafacturer">${productData.brand}</div>
      <h1 class="product-info__title">${productData.title}</h1>
      <p class="product-info__description">${productData.description}</p>

      <div class="product-info__price-wrapper">
      <b class="product-info__price">$${productData.price}</b>
      <span class="badge">${productData.discountPercentage}% off</span>
      </div>

      <del class="product-info__old-price">$${(productData.price / (1 - productData.discountPercentage / 100)).toFixed(2)}</del>

      <div class="product-page__cart-actions">
      <div class="product-info__quantity-wrapper">
      <button class="product-info__quantity-button decrease-btn" type="button" aria-label="Remove 1">-</button>
      <div class="product-info__quantity">0</div>
      <button class="product-info__quantity-button increase-btn" type="button" aria-label="Add 1">+</button>
      </div>

      <button class="btn" style="width: 270px;">
      <span class="button__inner">
      <span class="button__prepend">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M3.863 3.641h17.062c.583 0 1.01.55.87 1.114l-1.822 7.283a.896.896 0 0 1-.817.677l-14.321.842c.256.598.849 1.01 1.53 1.01h10.008a2.72 2.72 0 0 1 2.717 2.716A2.72 2.72 0 0 1 16.373 20c-1.878 0-3.197-1.872-2.555-3.642H8.913C9.556 18.13 8.233 20 6.358 20 4.1 20 2.83 17.385 4.22 15.611c-.77-.61-1.218-1.508-1.29-2.336l-.98-10.909v.001c.072.796.169 1.876-.051-.575H.896A.896.896 0 0 1 .896 0h1.82c.465 0 .852.354.894.816l.253 2.825Zm1.57 13.642a.926.926 0 0 0 1.85 0 .926.926 0 0 0-1.85 0Zm10.94.925a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm-11.78-6.432 13.801-.811 1.383-5.531H4.024l.57 6.342Z" clip-rule="evenodd"></path></svg>
      </span>
      <span class="button__text">Add to cart</span>
      </span>
      </button>
      </div>
      </div>
      </div>
    `;
  })
  .catch((error) => {
    // Xatolikni qaytarish va ma'lumotlarni qo'lipga joylash HTML kodi
  });

// SEARCH FORM
const dropDownHeader = document.querySelector(".dropdown-header");
const dropDownBodyOptions = document.querySelectorAll(".dropdown-body li");

  // Control Drop Down Menu
function controlDropDown() {
  const dropDownWrapper = document.querySelector(".dropdown-wrapper");

  if (dropDownWrapper.classList.contains("open")) {
    dropDownWrapper.classList.remove("open");
  }
  else {
    dropDownWrapper.classList.add("open");
  }
};

if (dropDownHeader) {
  dropDownHeader.addEventListener("click", controlDropDown);
}

dropDownBodyOptions.forEach((option) => {
  option.addEventListener("click", () => {
    let optionValue = option.dataset.catalog;
    optionValue == "all"

    controlDropDown();

    dropDownHeader.querySelector("span").textContent = optionValue;
  });
});



// SHOPPING CART ACTIONS:  Product quantity button;
const elProductQuantityIncreaseButton = document.querySelector('.increase-btn');
const elProductQuantityDecreaseButton = document.querySelector('.decrease-btn');
const elProductQuantity = document.querySelector('.product-info__quantity');


if (elProductQuantityIncreaseButton) {
  elProductQuantityIncreaseButton.addEventListener('click', function () {
    elProductQuantity.textContent = parseInt(elProductQuantity.textContent, 10) + 1;
  });
};

if (elProductQuantityDecreaseButton) {
  elProductQuantityDecreaseButton.addEventListener('click', function () {
    const quantity = parseInt(elProductQuantity.textContent, 10);

    if (quantity > 0) {
      elProductQuantity.textContent = quantity - 1;
    }
  });
};

// =============
const elsTabsItem = document.querySelectorAll('.tabs__item');
const elsTabLink = document.querySelectorAll('.js-tab-link');
const elsTabpanels = document.querySelectorAll('.tabpanels__item');


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
  return `<li class="products__list-item product-card">
  <a> <img class="product-card__img" src="${product.thumbnail}" alt="${product.title}">
  <div class="product-card__info">
    <h3 class="product-card__title">${product.title}</h3>
    <span class="product-card__price">$${product.price}</span>
  </div></a>
  </li>`;
}

async function appendCard(skip, count) {
  const elProductList = document.querySelector('.products__list');
  let cardsHtml = '';

  if (elProductList) {
    try {
      // API dan ma'lumotlarni olish
      const res = await fetch("https://dummyjson.com/products");
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




// SHOPPING CART ACTIONS:  Product quantity button;
const elProductQuantityIncreaseButton = document.querySelector('.js-product-quantity-increase-button');
const elProductQuantityDecreaseButton = document.querySelector('.js-product-quantity-decrease-button');
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
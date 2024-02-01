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


function stickyHeader() {
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
  }
}



// == Product cards
function productCard(product) {
  return `<li class="products__list-item product-card">
  <img class="product-card__img" src="${product.image}" alt="${product.title}">
  <div class="product-card__info">
  <h3 class="product-card__title">${product.title}</h3>
  <span class="product-card__price">$. ${product.price}</span>
  </div>
  </li>`;
}

async function appendCard(count) {
  const elProductList = document.querySelector('.products__list');
  let cardsHtml = '';

  if (elProductList) {
    try {
      // API dan ma'lumotlarni olish
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Ma'lumotlarni olishda xato: ${data.message}`);
      }

      // Faqat 8 ta ma'lumotni olish
      const limitedData = data.slice(10, 18);

      // Har bir mahsulot uchun cardHtml ni qo'shish
      for (let i = 0; i < count; i++) {
        cardsHtml += productCard(limitedData[i]);
      }

      // ProductList ga cardHtml ni qo'shish
      elProductList.innerHTML += cardsHtml;
    } catch (error) {
      console.error("Ma'lumotlarni olishda xatolik:", error);
    }
  }

}

// Misol uchun 8 ta productCard joylash
appendCard(8);

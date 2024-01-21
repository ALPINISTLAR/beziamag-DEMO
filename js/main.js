// =============
const elsTabsItem = document.querySelectorAll('.tabs__item');
const elsTabLink = document.querySelectorAll('.js-tab-link');
const elsTabpanels = document.querySelectorAll('.tabpanels__item');


function DeactivateTabItems () {
  elsTabsItem.forEach(function (elTabsItem) {
    elTabsItem.classList.remove('tabs__item--active');
  });
}

function DeactivateTabpanels () {
  elsTabpanels.forEach(function (elTabpanel) {
    elTabpanel.classList.remove('tabpanels__item--active');
  });
}


elsTabLink.forEach(function (elTabLink) {
  elTabLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    DeactivateTabItems();
    elTabLink.parentElement.classList.add('tabs__item--active');
    DeactivateTabpanels();
    // const elTargetPanel = document.querySelector(`#${elTabLink.href.split('#')[1]}`);
    const elTargetPanel = document.querySelector(elTabLink.dataset.tabTarget);
    elTargetPanel.classList.add('tabpanels__item--active');
  });
});

// =================

document.querySelector('.btn--right').addEventListener('click', function() {
  const productList = document.querySelector('.products__list');
  // Boshqa talablar bo'yicha shu erda scroll qilishingiz mumkin
  productList.scrollLeft += 100; // Masalan, har safar 100 piksel o'nga o'chadi
});

document.querySelector('.btn--left').addEventListener('click', function() {
  const productList = document.querySelector('.products__list');
  // Boshqa talablar bo'yicha shu erda scroll qilishingiz mumkin
  productList.scrollLeft -= 100; // Masalan, har safar 100 piksel o'nga o'chadi
});


let intervalId;

function startMoving(direction) {
  const productList = document.querySelector('.products__list');
  const speed = 2; // Harakatlanish tezligi (px)

  intervalId = setInterval(function() {
    if (direction === 'right') {
      productList.scrollLeft += speed;
    } else if (direction === 'left') {
      productList.scrollLeft -= speed;
    }
  }, 10); // 10 millisekundda bir harakatlanish
}

function stopMoving() {
  clearInterval(intervalId);
}

document.querySelector('.btn--left').addEventListener('mousedown', function() {
  startMoving('left');
});

document.querySelector('.btn--right').addEventListener('mousedown', function() {
  startMoving('right');
});

document.addEventListener('mouseup', stopMoving);

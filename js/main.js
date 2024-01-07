const elLauncher = document.querySelector('.launcher');

function closeLauncher() {
  elLauncher.classList.add('launcher--close');
}

function visibilityNone() {
  elLauncher.style.visibility = "hidden";
}

setTimeout(closeLauncher, 1500);
setTimeout(visibilityNone, 2300);

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

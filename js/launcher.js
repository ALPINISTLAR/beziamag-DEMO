const elLauncher = document.querySelector('.launcher');

function closeLauncher() {
  elLauncher.classList.add('launcher--close');
}

function visibilityNone() {
  elLauncher.style.visibility = "hidden";
}

setTimeout(closeLauncher, 1500);
setTimeout(visibilityNone, 2300);

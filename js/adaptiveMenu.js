'use strict';

window.adaptiveMenu = (function (){
  var navToggle = document.querySelector('.nav-toggle');
  var callbackToggle = document.querySelector('.callback-toggle');
  var headerNav = document.querySelector('.header-nav');

  navToggle.addEventListener('click', function() {
    headerNav.classList.toggle('header-nav--open');
  })

})();
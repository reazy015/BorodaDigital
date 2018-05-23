'use strict';

window.adaptiveMenu = (function (){
  var navToggle = document.querySelector('.nav-toggle');
  var callbackToggle = document.querySelector('.callback-btn');
  var headerNav = document.querySelector('.header-nav');
  var callbackBlock = document.querySelector('.callback-form-block');
  var callbackAdaptiveToggle = document.querySelector('.callback-toggle');

  navToggle.addEventListener('click', function() {
    headerNav.classList.toggle('header-nav--open');
  });

  callbackToggle.addEventListener('click', function() {
    callbackToggle.classList.toggle('callback-btn--open');
    callbackBlock.classList.toggle('callback-form-block--open');
  });

  callbackAdaptiveToggle.addEventListener('click', function() {
    callbackBlock.classList.toggle('callback-form-block--open');
  })
})();
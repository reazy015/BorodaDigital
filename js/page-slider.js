'use strict';

window.pageSlider = ( function() {
  var mainSlidesWrapper = document.querySelector('.slides-wrapper');
  var sliderForwardBtn = document.querySelector('.scroll-bar-buttons__right');
  var sliderBackwardBtn = document.querySelector('.scroll-bar-buttons__left');
  var aboutArticlesList = mainSlidesWrapper.querySelectorAll('.js-about-description-item');
  var aboutCategoriesList = mainSlidesWrapper.querySelectorAll('.js-category-item');
  var aboutControlsList = mainSlidesWrapper.querySelectorAll('.js-about-control');
  var sliderState = {
    slidesAmount: document.querySelectorAll('.main-section-slide'),
    startSectionSliding: false,
    totalSlidingCounter: 0,
    sectionSlidingCounter: 0
  };

  function getListIndex(list, item) {
    return Array.prototype.indexOf.call(list, item);
  }

  function disableAllActiveCategories() {
    for (var i = 0; i < aboutArticlesList.length; i++) {
      aboutArticlesList[i].classList.remove('about-description-item--active');
      aboutCategoriesList[i].classList.remove('about-categories-wrapper--active');
      aboutControlsList[i].classList.remove('about-controls-item--active')
    }
  }

  function activateCategoriesByIndex(index) {
    aboutArticlesList[index].classList.add('about-description-item--active');
    aboutCategoriesList[index].classList.add('about-categories-wrapper--active');
    aboutControlsList[index].classList.add('about-controls-item--active');
  }

  function checkReadyToSectionSlide() {
    if (getListIndex(aboutControlsList, document.querySelector('.about-controls-item--active')) === 2) {
      sliderState.startSectionSliding = true;
    } else {
      sliderState.startSectionSliding = false;
    }
  }

  function checkReadyToArticlesSlide(index) {
    if (index === 0) {
      sliderState.startSectionSliding = false;
    }
  }

  function slideSection(index) {
    if (index >= 0) {
      mainSlidesWrapper.style.transform = 'translate(-' + index + '00%)';
    } else {

    }
  }

  function onAboutControlsHandleClick(target) {
    var targetIndex = getListIndex(aboutControlsList, target);
    sliderState.totalSlidingCounter = targetIndex;
    disableAllActiveCategories();
    activateCategoriesByIndex(targetIndex);
    checkReadyToSectionSlide();
  }

  function onForwardBtnHandleClick() {
    if (sliderState.startSectionSliding) {
      var index = ++sliderState.sectionSlidingCounter;
      slideSection(index);
    } else {
      var index = ++sliderState.totalSlidingCounter;
      disableAllActiveCategories();
      activateCategoriesByIndex(index);
      checkReadyToSectionSlide();
    }

    console.log(sliderState.startSectionSliding);
  }

  function onBackwardBtnHandleClick() {
    if (sliderState.startSectionSliding) {
      var index = --sliderState.sectionSlidingCounter;
      slideSection(index);
      checkReadyToArticlesSlide(index)
    } else {
      var index = --sliderState.totalSlidingCounter;

      if (index >= 0) {
        disableAllActiveCategories();
        activateCategoriesByIndex(index);
        checkReadyToSectionSlide();
      } else {
        sliderState.totalSlidingCounter = 0;
      }
    }

    console.log(sliderState.startSectionSliding);
  }

  function scrollOnWheel(e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0  && window.innerWidth > 1024) {
      onForwardBtnHandleClick();
    } else {
      onBackwardBtnHandleClick();
    }
  }

  function onTouchSwipe(evt) {
    var startX = null;
    var deltaX = null;
    var startX = evt.targetTouches[0].pageX;

    this.addEventListener('touchmove', function(evt) {
      deltaX = evt.targetTouches[0].pageX - startX;

      if (Math.abs(deltaX) >= 150) {

        if (deltaX > 0) {
          onForwardBtnHandleClick();
        } else {
          onBackwardBtnHandleClick();
        }
      }
    }, false);
  }


  //Debounce

  var scrollOnWheelDebounce = _.debounce(scrollOnWheel, 200);

  //EventListeners

  for (var i = 0; i < aboutControlsList.length; i++) {
    aboutControlsList[i].addEventListener('click', function(evt) {
      var target = evt.target;
      onAboutControlsHandleClick(target);
      console.log(sliderState.startSectionSliding);
    })
  }

  sliderForwardBtn.addEventListener('click', onForwardBtnHandleClick);

  sliderBackwardBtn.addEventListener('click', onBackwardBtnHandleClick);

  window.addEventListener('wheel', function(e) {
    scrollOnWheelDebounce(e);
  });

  mainSlidesWrapper.addEventListener('touchstart', onTouchSwipe);

})();
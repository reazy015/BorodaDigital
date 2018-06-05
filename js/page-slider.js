'use strict';

window.pageSlider = ( function() {
  var mainSlidesWrapper = document.querySelector('.slides-wrapper');
  var scrollBar = document.querySelector('.scroll-bar');
  var scrollBarFill = document.querySelector('.scroll-bar__fill');
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
  var CURRENT_TOTAL_SLIDE_TIMES = 7;

  function getListIndex(list, item) {
    return Array.prototype.indexOf.call(list, item);
  }

  function fullfillScrollBar(index) {
    var fillPace = scrollBar.offsetWidth / CURRENT_TOTAL_SLIDE_TIMES;
    scrollBarFill.style.width = index * fillPace + 'px';
  }

  function disableAllActiveCategories() {
    for (var i = 0; i < aboutArticlesList.length; i++) {
      aboutArticlesList[i].classList.remove('about-description-item--active');
      aboutCategoriesList[i].classList.remove('about-categories-wrapper--active');
      aboutControlsList[i].classList.remove('about-controls-item--active')
    }
  }

  function activateCategoriesByIndex(index) { 
    console.log(index);

    aboutArticlesList[index].classList.add('about-description-item--active');
    aboutCategoriesList[index].classList.add('about-categories-wrapper--active');
    aboutControlsList[index].classList.add('about-controls-item--active');
    fullfillScrollBar(index);

  }

  function checkReadyToSectionSlide() {
    if (getListIndex(aboutControlsList, document.querySelector('.about-controls-item--active')) === 2) {
      sliderState.startSectionSliding = true;
    }     
  }  

  function checkReadyToSectionSlideBackward() {
    if (getListIndex(aboutControlsList, document.querySelector('.about-controls-item--active')) === 2 && mainSlidesWrapper.style.transform === 'translate(0%)') {
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
      fullfillScrollBar(index + 3);
    } else {

    }
  }

  function onAboutControlsHandleClick(target) {
    var targetIndex = getListIndex(aboutControlsList, target);
    sliderState.totalSlidingCounter = targetIndex;
    disableAllActiveCategories();
    activateCategoriesByIndex(targetIndex);    
  }

  function onForwardBtnHandleClick() {
    checkReadyToSectionSlide();
    
    console.log(sliderState.startSectionSliding);

    if (sliderState.startSectionSliding) {
      var index = ++sliderState.sectionSlidingCounter;

      if (sliderState.sectionSlidingCounter > 4) {
        sliderState.sectionSlidingCounter = 4;
        slideSection(sliderState.sectionSlidingCounter);
      } else {
        slideSection(index);
      }

    } else {      
      var index = ++sliderState.totalSlidingCounter;
      

      disableAllActiveCategories();
      activateCategoriesByIndex(index);      
    }

    console.log(sliderState.startSectionSliding);
  }

  function detectswipe(el,func) {
      var swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  
      var max_x = 40; 
      var min_y = 40;  
      var max_y = 50; 
      var direc = "";
      var ele = document.getElementById(el);
      ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX; 
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX; 
        swipe_det.eY = t.screenY;    
      },false);
      ele.addEventListener('touchend',function(e){        
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
          if(swipe_det.eX > swipe_det.sX) onForwardBtnHandleClick();
          else onBackwardBtnHandleClick();
        }        
      },false);  
  }

  function onBackwardBtnHandleClick() {
    checkReadyToSectionSlideBackward();
    

    if (sliderState.startSectionSliding) {
      var index = --sliderState.sectionSlidingCounter;

     

      slideSection(index);
      
    } else {
      var index = sliderState.totalSlidingCounter <= 0 ? 0 : --sliderState.totalSlidingCounter;      

      disableAllActiveCategories();
      activateCategoriesByIndex(index);     
    }
    

  }

  function scrollOnWheel(e) {
    e.preventDefault();
    
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0  && window.innerWidth > 1024) {
      onForwardBtnHandleClick();
    }

    if (delta < 0 && window.innerWidth > 1024) {
      onBackwardBtnHandleClick();
    }
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

  detectswipe('slides-wrapper', function() {
    alert('It works!');
  });

//----------------------------------------------------------
  // $('.slides-wrapper').on('swipeleft', onForwardBtnHandleClick);
  // $('.slides-wrapper').on('swiperight', onBackwardBtnHandleClick);

  // $(document).bind('pageinit', function(event){
  //   $('.ui-link').removeClass('ui-link');
  //   alert('click!!!!');
  // });

})();
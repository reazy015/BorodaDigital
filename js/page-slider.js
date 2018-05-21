'use strict';

window.pageSlider = ( function() {
  var aboutDescriptionsList = document.querySelectorAll('.js-about-description-item');
  var aboutCategoriesList = document.querySelectorAll('.js-category-item');
  var aboutControlsBtnList = document.querySelectorAll('.js-about-control');
  var mainSliderScrollBar = document.querySelector('.scroll-bar');
  var mainSliderScrollBarFill = mainSliderScrollBar.querySelector('.scroll-bar__fill');
  var mainSliderRightBtn = document.querySelector('.scroll-bar-buttons__right');
  var mainSliderLeftBtn = document.querySelector('.scroll-bar-buttons__left');
  var slidesWrapper = document.querySelector('.slides-wrapper');
  var currentAboutListsLength = 3;
  var initialSlideCount = 0;
  var initialBlockSlideCount = 0;
  var totalSlideAmount = 7;
  var startSlideBlocks = false;

  function getListIndex(list, item) {
    return Array.prototype.indexOf.call(list, item);
  }

  function fillScrollBar(number) {
    initialSlideCount = number;
    var currentScrollBarWidth = mainSliderScrollBar.offsetWidth;
    var currentSlideDivision = ((currentScrollBarWidth / totalSlideAmount)/currentScrollBarWidth) * 100;
    var additionalWidth = currentSlideDivision * number;
    mainSliderScrollBarFill.style.width = additionalWidth + '%';
  }

  function deleteAboutActiveClasses() {
    for (var i = 0; i < currentAboutListsLength; i++) {
      aboutDescriptionsList[i].classList.remove('about-description-item--active');
      aboutCategoriesList[i].classList.remove('about-categories-wrapper--active');
      aboutControlsBtnList[i].classList.remove('about-controls-item--active')
    }
  }

  function setActiveItemsByIndex(index) {
    aboutDescriptionsList[index].classList.add('about-description-item--active');
    aboutCategoriesList[index].classList.add('about-categories-wrapper--active');
    aboutControlsBtnList[index].classList.add('about-controls-item--active');
  }

  function aboutControlOnClickHandler(evt) {
    var index = getListIndex(aboutControlsBtnList, evt.target);
    deleteAboutActiveClasses();
    setActiveItemsByIndex(index);
    fillScrollBar(index);
  }

  function scrollBarBtnOnClickHandle(index) {
    if (index < 3) {
      deleteAboutActiveClasses();
      setActiveItemsByIndex(index);
      fillScrollBar(index);
    } else {
      return false;
    }
  }

  function scrollMainWrapperBlocks(scrollIndex, blockIndex) {
    fillScrollBar(scrollIndex);
    slidesWrapper.style.transform = 'translate(-' + blockIndex +'00%)';
  }

  function scrollOnWheel(e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0) {

      if (startSlideBlocks) {
        initialSlideCount++;
        slidesWrapper.style.transform = 'translate(-100%)';
        fillScrollBar(initialSlideCount);
      }

      if (initialSlideCount && initialSlideCount < 2) {
        initialSlideCount++;
        scrollBarBtnOnClickHandle(initialSlideCount);
    }

      if (!initialSlideCount) {
        initialSlideCount++;
        scrollBarBtnOnClickHandle(initialSlideCount);
      }

      console.log(startSlideBlocks);

    } else {

      if (!startSlideBlocks) {
        initialSlideCount--;
        scrollBarBtnOnClickHandle(initialSlideCount);
        console.log(startSlideBlocks);
      }

      if (startSlideBlocks) {
        initialSlideCount--;
        slidesWrapper.style.transform = 'translate(0%)';
        fillScrollBar(initialSlideCount);

        if (initialSlideCount <= 2) {
          startSlideBlocks = false;
        }
      }
    }

    if (initialSlideCount >= 2) {
      startSlideBlocks = true;
    } else {
      startSlideBlocks = false;
    }

    scrollBarBtnOnClickHandle(initialSlideCount);
  }

  function onTouchSwipe(evt) {
    var startX = null;
    var deltaX = null;
    var startX = evt.targetTouches[0].pageX;

    this.addEventListener('touchmove', function(evt) {
      deltaX = evt.targetTouches[0].pageX - startX;
      console.log(startX);
      console.log(deltaX);

      if (Math.abs(deltaX) >= 250) {


        if (deltaX > 0) {

          if (startSlideBlocks) {
            initialSlideCount++;
            slidesWrapper.style.transform = 'translate(-100%)';
            fillScrollBar(initialSlideCount);
          }

          if (initialSlideCount && initialSlideCount < 2) {
            initialSlideCount++;
            scrollBarBtnOnClickHandle(initialSlideCount);
          }

          if (!initialSlideCount) {
            initialSlideCount++;
            scrollBarBtnOnClickHandle(initialSlideCount);
          }

          if (initialSlideCount >= 2) {
            startSlideBlocks = true;
          } else {
            startSlideBlocks = false;
          }

        } else {
          console.log('left');
        }
      }

      evt.preventDefault();
      evt.stopPropagation();
    }, false);
  }

  var scrollOnWheelDebounce = _.debounce(scrollOnWheel, 200);
  var onTouchSwipeDebounce = _.debounce(onTouchSwipe, 200);

  for (var i = 0; i < currentAboutListsLength; i++) {
    aboutControlsBtnList[i].addEventListener('click', aboutControlOnClickHandler);
  }

  mainSliderRightBtn.addEventListener('click', function() {
    if (startSlideBlocks) {
      initialSlideCount++;
      initialBlockSlideCount++;
      slidesWrapper.style.transform = 'translate(-' + initialBlockSlideCount + '00%)';
      fillScrollBar(initialSlideCount);
    }

    if (initialSlideCount && initialSlideCount < 2) {
      initialSlideCount++;
      scrollBarBtnOnClickHandle(initialSlideCount);
    }

    if (!initialSlideCount) {
      initialSlideCount++;
      scrollBarBtnOnClickHandle(initialSlideCount);
    }

    if (initialSlideCount >= 2) {
      startSlideBlocks = true;
    } else {
      startSlideBlocks = false;
    }
  });

  mainSliderLeftBtn.addEventListener('click', function() {
    if (!startSlideBlocks) {
      initialSlideCount--;
      scrollBarBtnOnClickHandle(initialSlideCount);
      console.log(startSlideBlocks);
    }

    if (startSlideBlocks) {
      initialSlideCount--;
      initialBlockSlideCount--;
      slidesWrapper.style.transform = 'translate(-' + initialBlockSlideCount + '0%)';
      fillScrollBar(initialSlideCount);

      if (initialSlideCount >= 2) {
        startSlideBlocks = true;
      } else {
        startSlideBlocks = false;
      }
    }
  });

  window.addEventListener('wheel', function(e) {
    scrollOnWheelDebounce(e);
  });

  slidesWrapper.addEventListener('touchstart', onTouchSwipeDebounce);

})();
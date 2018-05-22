'use strict';

var myMap;
var MyIconContentLayout;

ymaps.ready(init);

function init () {
  MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
  ),
    myMap = new ymaps.Map('map', {
      center: [59.925858, 30.317925],
      zoom: 18,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });

  var myPlacemark = new ymaps.Placemark([59.925858, 30.317925],{
    hintContent: 'Мы находимся: Московский пр. д.2'
  },{
    iconLayout: 'default#image',
    iconImageHref: 'img/icons/map-baloon.png',
    iconImageSize: [40, 65],
    iconImageOffset: [-20, -70],
    iconContentLayout: MyIconContentLayout
  });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}